---
name: "Cosmic IDE"
tagline: "A desktop-class IDE that runs natively on Android."
description: "Write, build, and run code on your phone or tablet with no root or cloud. Powered by a compatibility layer over a Linux runtime, pacman, and plugins that handle language setup automatically."
tech:
  - "Jetpack Compose"
  - "C/C++"
  - "Arch Linux ARM"
  - "LSP"
  - "TextMate"
  - "Plugins"
stars: 763
forks: 107
github: "https://github.com/Cosmic-IDE/Cosmic-IDE"
featured: true
order: 1
screenshots:
  - src: "https://github.com/Cosmic-Ide/Cosmic-IDE/raw/main/docs/images/scala-code-completion.jpeg"
    caption: "Scala code completion in Cosmic IDE powered by Metals language server"
    alt: "Scala code completion in Cosmic IDE"
  - src: "https://github.com/Cosmic-Ide/Cosmic-IDE/raw/main/docs/images/scala-gradle-build.jpeg"
    caption: "Integrated build output and Gradle task execution in the terminal"
    alt: "Scala Gradle build in Cosmic IDE terminal"
  - src: "https://github.com/Cosmic-Ide/Cosmic-IDE/raw/main/docs/images/java-diagnostics-quick-fixes.jpeg"
    caption: "Inline Java error diagnostics, type checking, and quick fixes"
    alt: "Java diagnostics and quick fixes"
  - src: "https://github.com/Cosmic-Ide/Cosmic-IDE/raw/main/docs/images/java-code-completion.jpeg"
    caption: "Java autocomplete and IntelliSense backed by Eclipse JDT LS while a Gradle app runs"
    alt: "Java code completion"
  - src: "https://github.com/Cosmic-Ide/Cosmic-IDE/raw/main/docs/images/java-symbol-information.jpeg"
    caption: "Detailed Java symbol information and documentation preview"
    alt: "Java symbol information"
  - src: "https://github.com/Cosmic-Ide/Cosmic-IDE/raw/main/docs/images/project-explorer.jpeg"
    caption: "Tree-based project explorer with multi-module navigation and file management"
    alt: "Cosmic IDE project explorer"
features:
  - "Rootless aarch64 Linux userland using in-process path translation and seccomp-BPF traps"
  - "Two-stage Arch Linux ARM bootstrap with pacman package management in app-private storage"
  - "Sora Editor with TextMate grammars, sticky scroll, minimap, and inline find & replace"
  - "Full Language Server Protocol (LSP) client over JSON-RPC stdio for completions, diagnostics, and quick fixes"
  - "Plugin system with isolated ClassLoaders, lifecycle hooks, event bus, and in-app marketplace"
  - "Interactive PTY terminal powered by JNI openpty with signal handling and resize support"
  - "Built-in Git client supporting clone, branch, stage, commit, diff, and SSH/token auth"
  - "Adaptive Material 3 layout for phones, tablets, hardware keyboards, and Samsung DeX"
---

Cosmic IDE is a native Android IDE built for writing, compiling, and running real projects directly on a phone or tablet—offline, without root, and without offloading work to a remote VM.

When I originally started Cosmic IDE, it was focused on Java and Kotlin on Android. After picking the project back up, I rebuilt the architecture around a rootless Linux execution layer, an extensible plugin runtime, and a full Language Server Protocol (LSP) editor so any language toolchain can run locally on ARM64 hardware.

## How the Runtime Works

Instead of using PRoot (`ptrace` syscall tracing), which slows down compiler-heavy workloads with constant context switches, Cosmic IDE keeps path translation **inside** the target process:

- **Dynamic ELF Binaries:** Launched through a bundled `libld_linux.so` with `LD_PRELOAD=libpath_redirect.so` and `seccomp-BPF` (`SECCOMP_RET_TRAP` / `SIGSYS`) to rewrite virtual paths like `/usr`, `/etc`, and `/tmp` into app-private storage without external tracer overhead.
- **Static ELF Binaries:** Handled by a custom `libstatic_loader.so` ELF loader that maps `PT_LOAD` segments directly in memory and forwards execution cleanly.
- **Two-Stage Arch Linux ARM Bootstrap:** First launch unpacks a minimal `glibc` environment (`files/glibc`), then initializes `pacman` keys and installs a full Arch Linux ARM userland into `files/arch`.

Once bootstrapped, `pacman -S` works inside the built-in PTY terminal (`openpty` over JNI) just like on a desktop Arch install.

## Editor & Language Intelligence

The editor is built on Sora Editor (`CodeEditor`) with TextMate grammar highlighting (`One Dark`, `Nord`, `Dracula`, `Monokai`, `Solarized`), multi-tab editing, sticky scroll, a code minimap, inline Find & Replace, and custom font support.

Language intelligence runs through local JSON-RPC stdio pipes managed by the `:exec` process layer, giving you real-time diagnostics, quick fixes, type info, hover docs, signature help, and go-to-definition right in the editor.

## Plugin Ecosystem

Cosmic IDE doesn't ship heavy compilers or SDKs inside the base APK. Instead, language stacks, build systems, and developer tools are packaged as plugins and installed on demand from the [Cosmic IDE Plugin Marketplace](https://plugins.ide.invokevirtual.org):

| Category | Available Plugins |
|---|---|
| **Languages & LSPs** | Java, C/C++, Rust, Go, Scala, Python, Dart, Swift, Zig, Gleam, Lua, TypeScript/JS, Vue |
| **Build Systems** | Gradle, Apache Maven, Apache Ant, CMake, Bun |
| **Mobile & Platforms** | Android Development Tools (SDK & build-tools), Flutter Mobile & Multiplatform |
| **GUI, Viewers & Tools** | X11 & VNC Desktop Display, Visual Debugger, HTTP & REST API Client, Diff & Patch Visualizer, JSON & Schema Tools, Markdown Tools |

Under the hood, each plugin declares a `plugin.json` manifest (`PluginDescriptor`), loads into an isolated `PluginClassLoader`, hooks into `PluginLifecycle` (`onLoad`, `onEnable`, `onDisable`, `onUnload`), and registers editor contributions, actions, and event listeners via `PluginRuntime`.

## Workspace, Git & Security

- **Storage Access:** Projects live either in high-speed app-private storage or external directories granted through Android's Storage Access Framework (`DocumentFile` + persisted URI permissions).
- **Git Integration:** Built-in Git panel for cloning repositories, switching branches, viewing diffs, staging, committing, and pushing over HTTPS or SSH.
- **Adaptive UI:** Material 3 Compose interface that scales from compact phone screens to multi-pane tablet and Samsung DeX desktop setups with hardware keyboard shortcuts.

## Architecture Deep-Dives

- [&rarr; Rootless Linux on Android: Inside the Cosmic IDE Architecture](/blog/rootless-linux-on-android/)
- [&rarr; Inside Cosmic IDE's Editor and Plugin Architecture](/blog/cosmic-ide-editor-and-plugin-architecture/)
