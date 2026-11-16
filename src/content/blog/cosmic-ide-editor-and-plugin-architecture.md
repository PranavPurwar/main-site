---
title: "Inside Cosmic IDE: Compose Code Editor, Language Services, and Plugin Runtime"
description: "Building a virtualized Jetpack Compose code editor from scratch, sharing one canvas between Tree-sitter and LSP, and loading plugins on Android ART."
pubDate: "Nov 14 2026"
tags: ["Android", "Kotlin", "Jetpack Compose", "LSP", "Tree-sitter", "Architecture"]
---

Getting a real Linux userland running on Android solves the compiler side of the problem, but a terminal alone doesn't make an IDE. You still need a code editor that feels smooth on a touchscreen, handles large files without dropping frames, and lets people add new languages without waiting for a app update.

When I picked [Cosmic IDE](https://github.com/Cosmic-Ide/Cosmic-IDE) back up, I didn't want to wrap Monaco in a `WebView` or use View-based [Sora Editor](https://github.com/Rosemoe/sora-editor) inside a Jetpack Compose app. So I built the editor stack natively in Compose and split the IDE's extension model into clean Gradle modules.

## Building a Code Editor in Jetpack Compose (`:core:editor`)

Writing an editor canvas in Compose means owning everything: text storage, cursor geometry, touch selection, IME input, fling physics, and syntax spans. Rather than cramming all of that into `:app`, I split it across four modules:

- **`:core:editor`**: The `CodeEditor` composable, a line-indexed `TextBuffer` (backed by per-line `StringBuilder`s for `_O(1)_` line access), `EditorState`, `LineMetrics` 2D viewport virtualization, `FoldingModel`, and `SpanManager`.
- **`:core:editor-treesitter`**: Incremental AST parsing and highlight queries through JNI (`ktreesitter`).
- **`:core:editor-lsp`**: LSP4J adapters (`LspCodeEditor` and `LspEditorCoordinator`) plus Compose overlay popups for completions, hovers, signature help, and code actions.
- **`:core:markdown`**: A lightweight CommonMark parser and `MarkdownView` composable used both for live Markdown previews and for rendering LSP hover documentation without spinning up a `WebView`.

### Keeping Highlights and Errors From Fighting Each Other

When you combine Tree-sitter syntax highlighting, LSP semantic tokens, cursor symbol highlights, and compiler squiggles on the same text buffer, they overlap constantly. `SpanManager` solves this by bucketing spans per line and compositing them in a strict priority order:

| Priority | Source | What it draws |
|---|---|---|
| `100` | **Diagnostics** | Red error and amber warning squiggles from the language server |
| `75` | **Document Highlights** | Matching read/write symbol occurrences under the cursor |
| `50` | **LSP Semantic Tokens** | Type, parameter, and field refinements from `textDocument/semanticTokens/full` |
| `40` | **Base Syntax** | Real-time Tree-sitter AST queries (or TextMate regex fallback) |

Because Tree-sitter runs incrementally on every keystroke in milliseconds, typing always feels instant, and when the language server catches up a moment later with semantic tokens or errors, higher-priority spans cleanly layer on top without flickering.

## Sharing Heavy Language Servers Across Tabs (`LspSessionManager`)

Language servers like `rust-analyzer`, `jdtls`, and `clangd` eat hundreds of megabytes of RAM. Spawning one per open tab on a phone would kill the app in seconds.

`LspSessionManager` in `:app` shares a single `LspSession` per project and server definition using simple reference counting:
- Opening the first `.rs` file in a project spawns `rust-analyzer`.
- Opening five more files reuses that same process.
- Closing the last matching tab shuts the server down cleanly.

Stdio communication uses standard JSON-RPC `Content-Length` headers, while a background daemon thread drains `stderr` into `LspLogStore`. That one detail saves a lot of silent breakage: plenty of language servers print warnings to `stderr`, and keeping it isolated stops it from corrupting the JSON-RPC stream.

You don't even need to write a plugin just to test a new language server. Under **Settings > Extensions > Languages**, you can drop in a custom starter script (`exec rust-analyzer` with file extensions), and Cosmic runs it inside the project root with `COSMIC_PROJECT_ROOT`, `COSMIC_FILE`, and `APP_FILES_DIR` already wired up.

## Why Cosmic Doesn't Ship Languages Out of the Box

One constraint I stuck to was that the base IDE app shouldn't hardcode compilers or language toolchains. Just like VS Code, the base app provides the editor, terminal, and extension contracts, while plugins handle toolchain setup and language integration.

Not only does it keep the codebase cleaner, but also allows OTA updates, third party extensions, and quick iterations.

The integration is split across three modules:
- **`:plugin-api`**: Pure contracts (`CosmicPlugin`, `PluginContext`, `PluginDescriptor`, `Disposable`, `PluginSettings`, `PluginEvents`) with zero UI dependencies.
- **`:ide-api`**: IDE extension points (`EditorExtensionPoints`, `ProjectExtensionPoints`, `UiExtensionPoints`) and Kotlin DSL helpers like `registerLspServer` and `registerProjectCommands`.
- **`:plugin-runtime`**: Scans `files/plugins/` for `plugin.json`, topologically sorts dependencies, loads DEX/APK bytecode into ART, and manages activation and cleanup.

Plugins compile strictly against `:plugin-api` and `:ide-api` as `compileOnly` dependencies; they never touch `:app` or `:plugin-runtime` internals.

### Letting Plugins Depend on Other Plugins (`DelegatingPluginClassLoader`)

Android's default `DexClassLoader` isolates each loaded APK/DEX from its siblings. That's a problem if someone wants to build a GitHub or GitLab extension on top of a core Git plugin.

`DelegatingPluginClassLoader` fixes that cleanly. When a plugin declares `"dependencies": ["org.cosmicide.git"]` in its `plugin.json`, its classloader keeps direct references to those dependency classloaders. If a class lookup misses locally and misses the host app classloader, it walks the declared dependencies instead of throwing `ClassNotFoundException`.

### Predictable Overrides & Leak-Free Unloading

When both a plugin and a user config target the same file extension, Cosmic resolves providers in descending priority:

| Priority | Provider |
|---|---|
| `500` | User-defined custom language servers (**Settings > Extensions > Languages**) |
| `350` | Plugin-provided LSP servers (`registerLspServer` DSL) |
| `200` | Built-in generic LSP router (`LspEditorLanguageProvider`) |
| `MIN` | Plain-text fallback |

Every plugin also gets a supervised `CoroutineScope` (`context.scope`) and tracked `Disposable` handles for every extension point, UI screen, or command it registers. Uninstalling a plugin cancels its coroutines and tears down its registrations automatically, without needing an app restart.
