---
name: "AppLock"
tagline: "Open-source Android app locker with zero telemetry and hardware biometric authentication."
description: "A lightweight, privacy-first application locker for Android. Built with Jetpack Compose and Material 3, it enforces security through hardware-backed biometrics and window manager overlays with zero network permissions and zero tracking."
tech:
  - "Kotlin"
  - "Jetpack Compose"
  - "Material 3"
  - "BiometricPrompt"
  - "Room"
  - "SQLCipher"
stars: 862
forks: 73
github: "https://github.com/aload0/AppLock"
featured: true
order: 2
screenshots:
  - src: "https://raw.githubusercontent.com/aload0/AppLock/refs/heads/master/fastlane/metadata/android/en-US/images/featureGraphic.png"
    caption: "AppLock banner: Open-source privacy security guard for Android"
    alt: "AppLock feature graphic"
  - src: "https://raw.githubusercontent.com/aload0/AppLock/refs/heads/master/fastlane/metadata/android/en-US/images/phoneScreenshots/1.png"
    caption: "Applications manager: toggle locking status for installed software"
    alt: "AppLock app list"
  - src: "https://raw.githubusercontent.com/aload0/AppLock/refs/heads/master/fastlane/metadata/android/en-US/images/phoneScreenshots/3.png"
    caption: "Security preferences, authentication triggers, and auto-lock timeouts"
    alt: "AppLock settings view"
  - src: "https://raw.githubusercontent.com/aload0/AppLock/refs/heads/master/fastlane/metadata/android/en-US/images/phoneScreenshots/7.png"
    caption: "PIN and biometric challenge overlay with clean Material 3 design"
    alt: "AppLock password unlock screen"
  - src: "https://raw.githubusercontent.com/aload0/AppLock/refs/heads/master/fastlane/metadata/android/en-US/images/phoneScreenshots/6.png"
    caption: "Setup wizard for Master PIN configuration and recovery methods"
    alt: "Set password screen"
  - src: "https://raw.githubusercontent.com/aload0/AppLock/refs/heads/master/fastlane/metadata/android/en-US/images/phoneScreenshots/5.png"
    caption: "Granular unlock timeout controls (immediately, screen off, or customized interval)"
    alt: "Unlock timeout configuration"
features:
  - "Zero network permissions in manifest — zero analytics, zero trackers"
  - "BiometricPrompt integrated with hardware Secure Element / StrongBox"
  - "High-priority WindowManager overlay interception"
  - "Anti-uninstall protection for user apps and system package settings"
  - "Granular unlock timeouts (immediate, screen off, or custom interval)"
  - "Distributed transparently on F-Droid and IzzyOnDroid"
---

I built AppLock around a strict zero-telemetry design. The application does not declare `android.permission.INTERNET` in its manifest, preventing network requests at the OS level. It contains no tracking libraries, ad SDKs, or cloud dependencies, verified through independent audits on Exodus Privacy and VirusTotal.

## Core Security Mechanisms

- **Hardware-Backed Biometrics**  
  Interfaces directly with Android's `BiometricPrompt` API, delegating cryptographic key verification to the device's hardware Secure Element and StrongBox enclave alongside master PIN fallback.
- **WindowManager Overlay Interception**  
  Uses high-priority system overlay channels to intercept foreground app launch events, blocking unauthorized access before sensitive views can render on screen.
- **Anti-Uninstall Protection**  
  Monitors package management intents and device settings access to prevent adversaries from bypassing the lock by force-stopping the service or uninstalling the package.
- **Granular Re-Lock Timeouts**  
  Supports flexible lock policies: lock immediately upon switching apps, lock when the display turns off, or allow a configurable grace period for frequent multitasking.

## Auditing & Implementation

- **Zero Network Access:** No `INTERNET` permission declared; mathematically zero outbound traffic.
- **Independent Audits:** Verified clean on Exodus Privacy (0 trackers) and VirusTotal (0 detection flags).
- **Encrypted Storage:** Encrypted SQLite database managed through Jetpack Room with SQLCipher.
- **UI Stack:** 100% Kotlin with Jetpack Compose and Material 3 dynamic color theming.
- **Distribution:** Built from source and distributed via F-Droid and IzzyOnDroid.

## In-Depth Security Architecture

For more context on the zero-permission model, hardware KeyStore enclave delegation, and window overlay defenses, read my article:

[&rarr; Designing Privacy-First Android Apps in a World of Ad SDKs](/blog/privacy-first-android-architecture/)

