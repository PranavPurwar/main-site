---
title: "Porting the JDK and Kotlin Compilers to the Android Runtime"
description: "How we patched OpenJDK javac and kotlinc to compile JVM bytecode directly on Android devices without root or cloud servers."
pubDate: "Feb 14 2024"
---

When building [Cosmic IDE](https://github.com/Cosmic-Ide/Cosmic-IDE), our primary design constraint was self-sufficiency: a developer holding an Android tablet should be able to write, compile, and run code entirely offline.

Compiling Java and Kotlin directly on Android presents severe runtime hurdles. Standard distributions of `javac` and `kotlinc` are built with assumptions that hold on desktop Linux or Windows, but break immediately when running inside Android’s Bionic C library and Dalvik/ART environment.

## The Architectural Mismatch

The standard OpenJDK toolchain depends on several mechanisms that Android restricts:

1. **Memory-Mapped IO & Large File Locks:** The desktop compiler frequently opens JAR classpaths using memory-mapped IO (`sun.nio.ch.FileChannelImpl`). Under Android’s scoped storage and strict seccomp filters, these calls often fail or behave unpredictably across vendor kernels.
2. **Missing JVM Classes:** Android’s runtime (libcore/ART) implements a subset of standard Java SE. Classes in packages like `javax.tools.*`, compiler internal SPIs, and compiler tree APIs (`com.sun.source.*`) simply do not exist on Android.
3. **Low-Memory Killer (LMK):** The Kotlin compiler is memory-hungry. A cold compilation of even a moderate Kotlin project routinely spikes heap usage, which quickly triggers Android’s LMK daemon to kill the host process.

## Patching javac for ART

For `javac-android`, we adapted OpenJDK's compiler codebase directly:

- **Classpath Provider Replacement:** We replaced standard NIO zip filesystem providers with an in-memory cached scanner tailored for Android's compressed APK and JAR structures.
- **ct.sym Decoupling:** Standard `javac` uses a compact symbol table (`ct.sym`) to cross-compile against older Java target versions. We bundled trimmed symbol definitions that load efficiently under ART without triggering large heap allocations.
- **Rootless Operation:** The entire pipeline executes as a standard library call inside the app’s process sandbox without requiring elevated privileges.

```groovy
// Integration via JitPack
repositories {
    maven { url 'https://jitpack.io' }
}

dependencies {
    implementation 'com.github.PranavPurwar:javac-android:27.23'
}
```

## Optimizing the Kotlin Pipeline

The Kotlin compiler pipeline was even more challenging. `kotlinc` relies heavily on IntelliJ IDEA's Virtual File System (VFS) to inspect classpaths and AST nodes.

To make this practical on mobile hardware:
- **`fastJarFileSystem` Integration:** We enabled an optimized in-memory JAR file provider that drastically cuts down filesystem syscalls during indexing.
- **Heap Ceilings:** By trimming unused IDE analysis phases and focusing strictly on the frontend and backend CLI compiler pipeline, we brought baseline compilation memory down to manageable limits for mobile devices.

The result is `kotlinc-android`, providing on-device compilation for modern Kotlin features (including coroutines and smart casts) right inside an Android process.

Both compiler ports are open source and available for any mobile development toolchain to embed.

