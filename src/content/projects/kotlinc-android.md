---
name: "kotlinc-android"
tagline: "The JetBrains Kotlin compiler, adapted for Android's ART runtime."
description: "Patched Kotlin and Java compiler builds for Android, featuring fastJarFileSystem support for on-device compilation in mobile IDEs and build tools."
tech:
  - "Kotlin"
  - "Java"
  - "Android ART"
  - "fastJarFileSystem"
stars: 5
forks: 2
github: "https://github.com/PranavPurwar/kotlinc-android"
featured: false
order: 5
features:
  - "Supports Kotlin 2.5 and the K2 compiler pipeline for JVM targets"
  - "fastJarFileSystem support for fast in-memory JAR indexing on mobile storage"
  - "Designed to pair with javac-android for mixed Java/Kotlin projects"
  - "Published on JitPack for easy integration into Android IDEs and compilers"
---

JetBrains' `kotlinc` relies heavily on desktop JVM reflection, NIO internals, and IntelliJ VFS assumptions that don't work out of the box on Android's ART runtime. `kotlinc-android` patches the compiler pipeline so Android apps can compile Kotlin source to JVM bytecode directly on-device.

Built alongside `javac-android` for Cosmic IDE, it's published on JitPack for any Android IDE, compiler app, or on-device build tool.

## What's Supported

- **Kotlin 2.5 & K2:** Supports modern Kotlin language features targeting the JVM.
- **`fastJarFileSystem`:** Includes `fastJarFileSystem` support to keep JAR classpath scanning fast on mobile flash storage.
- **Scope:** Focused on JVM bytecode targets (non-JVM backends like JS, Native, and Wasm are out of scope).

## Gradle Integration

```groovy
repositories {
    maven { url 'https://jitpack.io' }
}

dependencies {
    implementation 'com.github.PranavPurwar:kotlinc-android:2.4.0'
}
```
