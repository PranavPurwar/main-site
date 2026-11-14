---
title: "Rootless Linux on Android: Inside the Cosmic IDE Architecture"
description: "Why I walked away from PRoot, and how a custom glibc loader, seccomp-BPF traps, and a static ELF loader let Arch Linux ARM run inside an unrooted Android app."
pubDate: "Oct 19 2026"
tags: ["Systems", "Android", "Linux", "Virtualization", "Userland", "Arch Linux"]
---

Most mobile code editors on Android are basically thin text boxes talking to a remote server or a Docker container somewhere. The moment your train goes through a tunnel or your Wi-Fi drops, your dev environment disappears with it.

When I first started building [Cosmic IDE](https://github.com/Cosmic-Ide/Cosmic-IDE) years ago, I kept things simple and focused on Java and Kotlin. Getting JVM tooling running on Android was already a solved-enough problem thanks to projects like [Java IDE](https://github.com/tranleduy2000/javaide), [Sketchware Pro](https://github.com/Sketchware-Pro/Sketchware-Pro), and [CodeAssist](https://github.com/tyron12233/CodeAssist)—built by people I've actually talked to and learned from over the years.

Eventually I burned out on it and left the repo untouched for almost two years. When I picked it back up this year, I didn't want to build just another Java-on-Android app. I wanted real, offline-first language support—Rust, C++, Go, Python, Node.js, whatever I felt like writing—running directly on a phone or tablet without root, an unlocked bootloader, or a cloud VM.

Android's userland fights you at every step when you try to run standard Linux binaries.

## Why Linux Binaries Refuse to Run on Android

Even though Android runs on a Linux kernel, standard Linux binaries won't run out of the box:

1. **The dynamic linker isn't there:** Every dynamically linked `aarch64` Linux binary has `/lib/ld-linux-aarch64.so.1` baked into its `PT_INTERP` header. On Android, `/lib` doesn't exist—Android uses `/system/bin/linker64`—so `execve()` fails immediately with `ENOENT`.
2. **Bionic isn't glibc:** Android's C library (Bionic) is intentionally minimal. Desktop compilers, `pacman`, and JVM builds rely on glibc symbols, NSS behavior, and POSIX quirks that Bionic simply doesn't ship.
3. **Hardcoded paths and `W^X` SELinux rules:** Linux tools expect `/usr`, `/etc`, `/var`, and `/tmp`. Inside an unprivileged Android app, you can only write to your own `filesDir`. Worse, since Android 10, SELinux blocks `PROT_EXEC` memory mappings on files sitting in `app_data_file` (`filesDir` or `cacheDir`). The only place Android lets your app execute native binaries from is `nativeLibraryDir` (`/data/app/.../lib/arm64`), which carries the `apk_data_file` label.

## Why I Dropped PRoot

The usual answer on unrooted Android is **PRoot**. It uses `ptrace` to intercept syscalls from a child process and rewrite paths like `/usr/bin` on the fly inside a tracer process.

PRoot is great for quick shell sessions, and it's fine if you're running `python` or `vim`. For compilers and build systems, it's painful:

- `javac`, `kotlinc`, `clangd`, and `rust-analyzer` fire off hundreds of thousands of `stat`, `lstat`, `openat`, and `mmap` calls just scanning headers, dependencies, and ASTs.
- Every single syscall under `ptrace` bounces twice between the compiler, the kernel, and the tracer process.
- You end up watching a 10-second incremental build drag out past a minute.

I wanted native speed, which meant keeping path translation **inside** the target process instead of bouncing through a tracer.

<figure class="my-8 not-prose">
<svg viewBox="0 0 760 356" width="100%" class="w-full h-auto block rounded-2xl border border-outline-variant/70 bg-surface-container-low" role="img" aria-label="Architecture diagram showing :exec process layer wrapping the Linux Execution Subsystem">
<defs>
<marker id="arrow-up" viewBox="0 0 10 10" refX="5" refY="3" markerWidth="6" markerHeight="6" orient="auto">
<path d="M 1 8 L 5 2 L 9 8 z" fill="var(--color-primary)" />
</marker>
</defs>
<rect x="32" y="24" width="696" height="122" rx="14" fill="var(--color-surface-container)" stroke="var(--color-outline-variant)" stroke-width="1.5" />
<rect x="32" y="24" width="696" height="36" rx="14" fill="var(--color-surface-container-high)" />
<rect x="32" y="46" width="696" height="14" fill="var(--color-surface-container-high)" />
<line x1="32" y1="60" x2="728" y2="60" stroke="var(--color-outline-variant)" stroke-width="1" />
<circle cx="54" cy="42" r="4.5" fill="var(--color-primary)" />
<text x="68" y="46.5" fill="var(--color-on-surface)" font-family="var(--font-mono)" font-size="13" font-weight="600">:exec — Process Architecture</text>
<text x="54" y="84" fill="var(--color-primary)" font-family="var(--font-mono)" font-size="12.5" font-weight="600">LinuxProcessRunner</text>
<text x="220" y="84" fill="var(--color-on-surface-variant)" font-family="var(--font-sans)" font-size="12.5">Loader selection &amp; environment construction</text>
<text x="54" y="106" fill="var(--color-primary)" font-family="var(--font-mono)" font-size="12.5" font-weight="600">ProcessExecutor</text>
<text x="220" y="106" fill="var(--color-on-surface-variant)" font-family="var(--font-sans)" font-size="12.5">Stdio execution for finite commands &amp; LSP servers</text>
<text x="54" y="128" fill="var(--color-primary)" font-family="var(--font-mono)" font-size="12.5" font-weight="600">PtyTerminal / PtyProcess</text>
<text x="220" y="128" fill="var(--color-on-surface-variant)" font-family="var(--font-sans)" font-size="12.5">JNI openpty, signals (Ctrl+C), and window resize</text>
<line x1="380" y1="186" x2="380" y2="152" stroke="var(--color-primary)" stroke-width="1.75" marker-end="url(#arrow-up)" />
<rect x="314" y="159" width="132" height="22" rx="11" fill="var(--color-primary-container)" stroke="var(--color-primary)" stroke-opacity="0.3" stroke-width="1" />
<text x="380" y="173.5" text-anchor="middle" fill="var(--color-on-primary-container)" font-family="var(--font-mono)" font-size="11" font-weight="600">wraps / launches</text>
<rect x="32" y="188" width="696" height="144" rx="14" fill="var(--color-surface-container)" stroke="var(--color-outline-variant)" stroke-width="1.5" />
<rect x="32" y="188" width="696" height="36" rx="14" fill="var(--color-surface-container-high)" />
<rect x="32" y="210" width="696" height="14" fill="var(--color-surface-container-high)" />
<line x1="32" y1="224" x2="728" y2="224" stroke="var(--color-outline-variant)" stroke-width="1" />
<circle cx="54" cy="206" r="4.5" fill="var(--color-editorial-accent)" />
<text x="68" y="210.5" fill="var(--color-on-surface)" font-family="var(--font-mono)" font-size="13" font-weight="600">Linux Execution Subsystem</text>
<text x="54" y="248" fill="var(--color-editorial-accent)" font-family="var(--font-mono)" font-size="12.5" font-weight="600">Dynamic ELF</text>
<text x="196" y="248" fill="var(--color-on-surface-variant)" font-family="var(--font-mono)" font-size="12">libld_linux.so --preload libpath_redirect.so</text>
<text x="54" y="270" fill="var(--color-editorial-accent)" font-family="var(--font-mono)" font-size="12.5" font-weight="600">Static ELF</text>
<text x="196" y="270" fill="var(--color-on-surface-variant)" font-family="var(--font-mono)" font-size="12">libstatic_loader.so (Custom ET_DYN ELF loader)</text>
<text x="54" y="292" fill="var(--color-editorial-accent)" font-family="var(--font-mono)" font-size="12.5" font-weight="600">Userland Root</text>
<text x="196" y="292" fill="var(--color-on-surface-variant)" font-family="var(--font-sans)" font-size="12.5">files/arch (Pacman-managed Arch Linux ARM aarch64)</text>
<text x="54" y="314" fill="var(--color-editorial-accent)" font-family="var(--font-mono)" font-size="12.5" font-weight="600">Bootstrap Root</text>
<text x="196" y="314" fill="var(--color-on-surface-variant)" font-family="var(--font-sans)" font-size="12.5">files/glibc (Unpacked from assets/glibc.tar.zst)</text>
</svg>
</figure>

It's worth being clear about what this is: a compatibility layer, not a container. Processes still run under the app's Linux UID with standard Android SELinux rules.

## Bootstrapping Arch Linux ARM in Two Stages

On a fresh install, Cosmic IDE doesn't dump a giant rootfs upfront. It bootstraps in two steps:

1. **Minimal glibc (`files/glibc`):** First launch unpacks `assets/glibc.tar.zst` into `files/glibc`. That gives us just enough to move: a minimal glibc, `bash`, `pacman`, `libld_linux.so`, and our shim library `libpath_redirect.so`.
2. **Real Arch Linux ARM (`files/arch`):** An interactive PTY terminal runs `setup.sh`, initializes `pacman` keys, and pulls standard Arch Linux ARM packages (`filesystem`, `glibc`, `bash`, `pacman`, `curl`, `git`, `tar`, `tzdata`). Once that finishes, `APP_FILES_DIR` switches to `files/arch`, and from there `pacman -S` works like it does on any Arch box.

## Launching Binaries Without Touching Root

Because `filesDir` isn't executable under Android's `W^X` policy, both `libld_linux.so` (the glibc dynamic linker) and `libstatic_loader.so` (my custom loader for static binaries) are packaged inside `app/src/main/jniLibs/arm64-v8a/`. Android unpacks them into `nativeLibraryDir` with execute permission.

Whenever `:exec` spawns a command, `LinuxProcessRunner` peeks at the file header and picks the right launch path:

| Binary Type | How we detect it | How it runs |
|---|---|---|
| **Dynamic glibc ELF** | `PT_INTERP` is `/lib/ld-linux*` | `$GLIBC_LINKER --argv0 <orig> --library-path <paths> --preload <shims> <target> <args...>` |
| **Static ELF** | No `PT_INTERP` (Go, musl, static Rust) | `$STATIC_LOADER --argv0 <orig> <target> <args...>` |
| **Shell script** | Starts with `#!` | Rewritten to `$APP_FILES_DIR/usr/bin/bash <script> <args...>` |
| **Android Bionic ELF** | `PT_INTERP` is `/system/bin/linker*` | Run directly with Android's linker, with glibc `LD_PRELOAD` stripped |

That last row is a bug I learned the hard way: if a glibc `LD_PRELOAD` ever leaks into a Bionic binary like `/system/bin/sh` or `logcat`, it crashes on startup. Stripping glibc env vars before delegating to Bionic is non-negotiable.

## The Six Shims Inside `libpath_redirect.so`

Earlier versions of this layer used Zig, which was fun to prototype, but I eventually consolidated the whole shim into six focused C files compiled into `libpath_redirect.so`:

### 1. Path Redirection & Virtual Root (`libpath_redirect.c`)
This hooks 90+ libc filesystem functions (`open*`, `stat*`, `statx`, `access*`, `dlopen`, `opendir`, `AF_UNIX` `bind`/`connect`) via `dlsym(RTLD_NEXT, ...)`. Requests to `/usr`, `/etc`, `/var`, `/tmp`, `/home`, and `/bin` get rewritten to `$APP_FILES_DIR`. It also normalizes `/data/user/<id>/` to `/data/data/` so multi-user Android paths never get double-redirected, and patches `/proc/self/exe` and `AT_EXECFN` so tools see their real binary name instead of `libld_linux.so`.

One subtle headache: Android's filesystem policies often reject hardlinks (`link` / `linkat`) with `EACCES` or `EXDEV`, which breaks `git`, `tar`, and `pacman` mid-extract. When a hardlink fails, the shim falls back to copying the file via `SYS_copy_file_range` into a temporary file and atomically renaming it into place.

### 2. Keeping Child Processes Inside glibc (`exec_wrap.c`)
Getting the first process into glibc is only half the battle. Build tools like Gradle, `make`, and `bash` spawn hundreds of child processes. `exec_wrap.c` hooks `execve`, `execvp`, `posix_spawn`, `system`, and `popen`, parses `#!` shebang lines in userspace, and wraps every glibc or static child with the same loader and preload environment.

### 3. Catching Inline Syscalls with Seccomp-BPF (`syscall.c`)
`LD_PRELOAD` only catches calls that go through the PLT/GOT. It is completely blind to inline `svc #0` instructions inside glibc internals or Go binaries (which bypass libc and make raw assembly syscalls).

To catch those, `syscall.c` reads `/proc/self/maps` at startup to find `libpath_redirect.so`'s own address range, then installs a Seccomp-BPF filter:
- If the program counter is inside `libpath_redirect.so`, the filter returns `SECCOMP_RET_ALLOW` so our own shim doesn't trap itself in an infinite loop.
- Any intercepted path or `execve` syscall coming from anywhere else triggers `SECCOMP_RET_TRAP` (`SIGSYS`).
- Our `sigsys_handler` pulls the AArch64 registers (`x0`..`x5`) out of `ucontext_t`, runs the path rewrite, and writes the result back to `x0`. It also wraps `sigaction` to preserve `SA_ONSTACK`, because Go's runtime panics if a signal arrives on a goroutine stack without an alternate stack.

### 4. A Custom Loader for Static Binaries (`static_loader.c`)
Statically linked binaries (Go tools, musl binaries) don't use `ld-linux` and ignore `LD_PRELOAD`. Running them directly fails both path lookups and Android's `W^X` check.

`libstatic_loader.so` is compiled as a standalone `ET_DYN` binary with zero libc dependencies. It reads `AT_PAGESZ` from the ELF auxiliary vector (so it works on both 4 KB kernels and Android 15/16+ 16 KB page devices), self-relocates its `R_AARCH64_RELATIVE` entries, loads the static binary's `PT_LOAD` segments into anonymous memory via `SYS_pread64`, builds a fresh 4 MB stack and auxv, installs its own Seccomp-BPF filter, and jumps straight to the target entry point.

### 5. DNS & Netlink Workarounds (`dns_fallback.c`, `net_shim.c`)
Android doesn't use `/etc/resolv.conf`—it resolves names over `/dev/socket/dnsproxyd`. On top of that, Android 11+ blocks `bind(AF_NETLINK, NETLINK_ROUTE)` for normal apps, which causes glibc's `getifaddrs()` and `getaddrinfo()` interface checks to fail with `EACCES`.

`net_shim.c` strips `AI_ADDRCONFIG` to avoid netlink probes and returns a synthetic loopback (`lo`) interface if `getifaddrs()` is denied. When glibc's `getaddrinfo` fails anyway, `dns_fallback.c` parses `$APP_FILES_DIR/etc/resolv.conf` and sends raw RFC 1035 UDP DNS packets (`A` and `AAAA`) over port 53.

### 6. Selective Fake Root (`fake_root.c`)
`pacman`, `makepkg`, and `sudo` refuse to run if `geteuid() != 0`, while `ssh` and `git` complain or look in `/root` if they think they *are* root. Instead of faking root globally, `fake_root.c` only returns `0` for `getuid`/`geteuid` when the running binary is in an explicit allowlist (`pacman`, `makepkg`, `tar`, `bsdtar`, `sudo`, `fakeroot`), and spoofs `st_uid = 0` when `sudo` checks `/etc/sudo.conf` or `/etc/sudoers`.

## PTY & Stdio Transports

All of this is wrapped in `:exec` behind two transports:
- **`ProcessExecutor.startCommand`** for finite commands and Language Server Protocol (LSP) servers, reading `Content-Length` framed JSON-RPC over stdout while draining stderr on a background thread so noisy compiler logs don't corrupt LSP framing.
- **`LinuxProcessRunner.startWithPty`** for interactive shells and `pacman`, backed by a small JNI layer calling `openpty`, `fork`, `login_tty`, `TIOCSWINSZ` for terminal resize, and `SIGINT` forwarding so `Ctrl+C` actually interrupts the foreground job.

It took plenty of trial, error, and `SIGSYS` debugging to get here, but running `pacman -Syu` or compiling a Rust crate locally on an unrooted phone at native speed makes every bit worth it.
