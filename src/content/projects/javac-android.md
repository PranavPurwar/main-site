---
name: "javac-android"
tagline: "Standalone OpenJDK Java compiler ported for Android ART runtimes."
description: "My port of upstream OpenJDK javac adapted to run inside Android's ART environment and PRoot userlands. Compiles modern Java source code directly on mobile hardware without cloud dependencies."
tech:
  - "Java"
  - "OpenJDK"
  - "Android ART"
  - "Bionic"
stars: 5
forks: 0
github: "https://github.com/PranavPurwar/javac-android"
featured: false
order: 4
features:
  - "Full javac compiler supporting Java 21 through Java 26 language specifications"
  - "Module system support with bundled ct.sym symbol database for target releases"
  - "Heap-conscious filesystem wrappers avoiding ART memory-mapped IO limits"
  - "Published on JitPack as a drop-in dependency for mobile IDEs"
---

Stock OpenJDK `javac` relies on desktop POSIX filesystem assumptions, JVM-specific memory-mapped I/O, and classloader structures that fail inside Android's ART execution environment and Bionic C library. I patched the upstream OpenJDK compiler tree to resolve these ART incompatibilities and packaged it as a drop-in Android library.

`javac-android` allows mobile code editors, educational compilers, and developer tools like Cosmic IDE to compile Java source files directly on mobile devices without root privileges or remote servers.

## Implementation Highlights

- **Modern Java Language Support**  
  Supports modern Java language specifications from Java 21 through Java 26, including the Java module system and record patterns.
- **Symbol Tables for Cross-Compilation**  
  Integrates standard `ct.sym` symbol databases and configurable `JAVA_HOME` paths to enable `--release` target cross-compilation on device hardware.
- **Heap-Conscious File Handling**  
  Replaces desktop memory-mapped file channels with streaming filesystem wrappers designed to run within Android process memory limits without triggering low-memory-killer (LMK) aborts.
- **Reusable JitPack Distribution**  
  Published on JitPack as `com.github.PranavPurwar:javac-android:27.23`, enabling any Android application to embed a complete Java compiler.

## Integration Example

```groovy
// Gradle dependency configuration
repositories {
    maven { url 'https://jitpack.io' }
}

dependencies {
    implementation 'com.github.PranavPurwar:javac-android:27.23'
}
```

## In-Depth Compiler Engineering

For an architectural breakdown of resolving ART classloader limitations, `ct.sym` symbol extraction, and heap constraints, read my article:

[&rarr; Porting the JDK and Kotlin Compilers to the Android Runtime](/blog/porting-compilers-to-android/)

