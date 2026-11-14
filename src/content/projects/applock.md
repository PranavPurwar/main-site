---
name: "AppLock"
tagline: "Open-source Android app locker with zero telemetry and hardware biometric authentication."
description: "A lightweight, privacy-first application locker for Android. Built with Jetpack Compose and Material 3, it enforces security through hardware-backed biometrics and window overlays with zero network permissions."
tech:
  - "Kotlin"
  - "Jetpack Compose"
  - "Material 3"
  - "BiometricPrompt"
  - "Room"
  - "SQLCipher"
stars: 913
forks: 93
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
  - "No INTERNET permission in AndroidManifest — enforced at the OS level"
  - "Fingerprint, Face Unlock, and PIN support via Android BiometricPrompt"
  - "Real-time foreground app interception via WindowManager overlays (no root required)"
  - "Anti-uninstall protection for user apps and system package settings"
  - "Configurable re-lock timeouts (immediate, screen-off, or custom grace period)"
  - "Audited clean on Exodus Privacy and VirusTotal; distributed on F-Droid & IzzyOnDroid"
---

App lockers on Android have a notorious reputation for bundling ad networks, trackers, and invasive background telemetry. I built **AppLock** around a simple guarantee: it doesn't even declare `android.permission.INTERNET` in its manifest, so the OS itself prevents any outbound network traffic.

## Key Capabilities

- **Hardware-Backed Authentication:** Integrates Android's `BiometricPrompt` API for fingerprint and face unlock alongside a master PIN fallback.
- **No-Root App Interception:** Watches foreground app launches and displays a Material 3 authentication overlay via `WindowManager` before protected apps become visible.
- **Anti-Uninstall Protection:** Guards package settings and uninstall flows so someone with your unlocked phone can't simply force-stop or remove AppLock to bypass it.
- **Flexible Unlock Timeouts:** Lock immediately when leaving an app, lock when the screen turns off, or set a custom grace period while multitasking.

## Privacy & Verification

- **Zero Network Access:** No `INTERNET` permission, no analytics, and no ad SDKs.
- **Encrypted Local State:** Settings and lock lists are stored locally with Room and SQLCipher.
- **Publicly Audited:** Verified with 0 trackers on Exodus Privacy and clean scans on VirusTotal, with source-built releases available via F-Droid and IzzyOnDroid.

[&rarr; Read more: Designing Privacy-First Android Apps in a World of Ad SDKs](/blog/privacy-first-android-architecture/)
