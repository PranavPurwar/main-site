---
name: "javac-android"
tagline: "The OpenJDK Java compiler, ported to Android."
description: "Upstream javac adapted to run on Android's ART runtime, compiling Java source directly on device with no cloud dependency."
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
  - "Supports Java 21 through Java 26 language specifications and the module system"
  - "Supports JAVA_HOME and ct.sym symbol tables for --release cross-compilation"
  - "Heap-conscious filesystem handling adapted for Android's ART runtime"
  - "Published on JitPack as a drop-in dependency for Android IDEs and build tools"
---

Stock OpenJDK `javac` assumes a desktop JVM, standard POSIX paths, and memory-mapped I/O patterns that break on Android's ART runtime and Bionic libc. `javac-android` is a patched build of the upstream OpenJDK compiler adapted to run directly inside Android apps.

I originally ported it for Cosmic IDE and packaged it as a standalone JitPack library so other Android editors, compilers, and educational tools can compile Java source on-device without root or a remote build server.

## What's Supported

- **Modern Java:** Compiles up to Java 26 language features, including the Java module system.
- **`JAVA_HOME` & `ct.sym`:** Supports standard `ct.sym` symbol tables and `JAVA_HOME` configuration for targeting specific `--release` levels.
- **ART-Friendly I/O:** Avoids desktop memory-mapped file assumptions that trigger ART memory issues on mobile devices.

## Gradle Integration

```groovy
repositories {
    maven { url 'https://jitpack.io' }
}

dependencies {
    implementation 'com.github.PranavPurwar:javac-android:27.23'
}
```
