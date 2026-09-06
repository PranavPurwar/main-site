---
name: "kotlinc-android"
tagline: "Standalone Kotlin compiler pipeline adapted for on-device mobile compilation."
description: "My port of the JetBrains Kotlin compiler toolchain adapted for Android ART runtimes. Integrates an in-memory virtual JAR filesystem to deliver fast on-device Kotlin compilation for mobile developer tools."
tech:
  - "Kotlin"
  - "Java"
  - "Android ART"
  - "fastJarFileSystem"
stars: 30
forks: 0
github: "https://github.com/PranavPurwar/kotlinc-android"
featured: false
order: 5
features:
  - "Kotlin 2.4 and 2.5 compiler support including the K2 pipeline"
  - "fastJarFileSystem in-memory indexing to accelerate mobile JAR scanning"
  - "Joint compilation alongside javac-android in mixed Java/Kotlin trees"
  - "Packaged as a lightweight JitPack artifact focused exclusively on JVM targets"
---

The official JetBrains Kotlin compiler (`kotlinc`) relies on desktop JVM reflection, NIO filesystem internals, and dynamic classloader assumptions that fail inside Android's ART execution environment. I adapted the compiler pipeline to run natively on Android devices, stripping desktop-only runtime baggage while preserving JVM bytecode generation.

Integrated with `fastJarFileSystem`, `kotlinc-android` enables mobile environments like Cosmic IDE to compile Kotlin projects on Android hardware without remote build servers.

## Key Technical Adaptations

- **Modern Language Versions**  
  Supports Kotlin 2.4 and 2.5 compiler iterations, including the K2 compiler pipeline, coroutines, and standard library bindings.
- **fastJarFileSystem Integration**  
  Integrates an in-memory virtual JAR filesystem to accelerate classpath scanning on mobile flash storage, cutting compile startup latency.
- **JitPack Artifact Distribution**  
  Packaged and deployed via JitPack as `com.github.PranavPurwar:kotlinc-android:2.4.0` for straightforward integration into third-party Android apps and IDE plugins.
- **Joint Java & Kotlin Compilation**  
  Operates alongside `javac-android` to support bidirectional Java-Kotlin joint compilation in multi-file project trees.

## Integration Example

```groovy
// Gradle dependency configuration
repositories {
    maven { url 'https://jitpack.io' }
}

dependencies {
    implementation 'com.github.PranavPurwar:kotlinc-android:2.4.0'
}
```

## In-Depth Compiler Engineering

For an architectural breakdown of IntelliJ VFS decoupling, fastJarFileSystem in-memory JAR virtual filesystems, and ART bytecode verification, read my article:

[&rarr; Porting the JDK and Kotlin Compilers to the Android Runtime](/blog/porting-compilers-to-android/)

