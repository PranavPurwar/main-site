---
name: "Cosmic IDE"
tagline: "Desktop-class development on Android powered by a native Linux environment."
description: "A full Linux-based development environment running directly inside Android application storage without root. Hosts real compilers, build tools, package managers, and Language Server Protocol backends natively on device hardware."
tech:
  - "Jetpack Compose"
  - "C/C++"
  - "Extensions"
  - "Arch Linux ARM"
  - "Gradle"
  - "Language Server Protocol"
stars: 726
forks: 101
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
  - "Rootless aarch64 glibc compatibility layer running genuine Linux binaries"
  - "Integrated PTY terminal with pacman package management via Arch Linux ARM"
  - "Native Language Server Protocol (LSP) integration with inline diagnostics"
  - "Local build toolchains: Gradle daemons, Cargo, and Maven execution on device"
  - "In-app Plugin Marketplace to install language stacks and tools on demand"
  - "Built-in Git operations: clone, branch, stage, commit, diff, and remote sync"
  - "Syntax highlighting and themes powered by TextMate grammars"
  - "Responsive Material 3 workspace optimized for touch, keyboards, and Samsung DeX"
---

Cosmic IDE transforms Android devices into genuine developer workstations. Instead of functioning as a lightweight text editor, remote shell, or cloud wrapper, it hosts a real Linux userland directly inside app-private internal storage.

The platform executes real Linux binaries without root access, container virtualization, or virtual machine performance penalties. Genuine compilers, language server daemons, and build engines run straight on the device's ARM64 silicon with near-native throughput.

## Language Support & Toolchains

Cosmic IDE uses a modular plugin engine so you can install runtimes, language servers, and toolchains directly through the in-app marketplace on demand.

| Ecosystem | Languages & Runtimes | Language Servers & Build Tools |
|---|---|---|
| **JVM Stack** | Java, Kotlin, Scala 3 | Eclipse JDT LS, Metals (via Coursier), Kotlin LS, Gradle Daemons, Maven |
| **Systems & Native** | Rust, C, C++, Go, Gleam | `rust-analyzer`, `clangd`, `gopls`, Cargo, GCC |
| **Scripting & Web** | Python, Lua, Node.js | `pyright` / `pylsp`, LuaLS, npm |
| **Package Management** | Linux CLI utilities, system libraries | Arch Linux ARM repositories via `pacman` |

### Modern Language Server Protocol (LSP)

The editor communicates directly with official language servers over local JSON-RPC pipes. This brings desktop-grade developer intelligence to mobile hardware without cutting corners.

You get rich, context-aware autocomplete, method signature popups, type inference, parameter hints, and go-to-definition. The editor surfaces compiler diagnostics, syntax errors, and quick fixes inline as you write.

### Local Compilers & Build Automation

Heavy build systems execute locally rather than offloading to an external server. You can run incremental `./gradlew` builds, trigger `cargo build` for native Rust crates, or run Maven goals directly in your project directory.

Build tasks run in background threads with live console output, process controls, and cancellation hooks, ensuring long compilation runs do not lock up the editor interface.

### Integrated Terminal & Package Management

A built-in pseudo-terminal (PTY) gives direct access to standard shells including `bash` and `zsh`. It features full ANSI color escape handling, process management, and support for terminal multiplexers like `tmux`.

Through integrated Arch Linux ARM package mirrors, you can use `pacman` to install developer packages natively. Essential utilities like `git`, `neovim`, `curl`, `tar`, and custom compilation toolchains install without requiring device root or system modifications.

### Built-in Git Workflow

Manage your source code directly inside the interface without constantly switching into terminal sessions.

The Git panel supports cloning remote repositories, checking out branches, staging modified files, writing commit messages, viewing diffs, and syncing changes with platforms like GitHub and GitLab.

### Editor Experience & Workspace

The editing surface is built on TextMate grammars, providing accurate syntax highlighting across hundreds of languages alongside customizable color themes.

File management handles multi-module project trees, quick file search, and tabbed editor navigation. Projects can live inside high-speed app-private storage or external directories managed through Android's Document Picker (SAF).

The user interface adapts across device layouts, switching between touch-friendly mobile views, expanded tablet panes, and full multi-window desktop layouts under Samsung DeX with complete hardware keyboard and mouse shortcuts.

[&rarr; Read the deep-dive: Rootless Linux on Android](/blog/rootless-linux-on-android/)