---
title: "Designing Privacy-First Android Apps in a World of Ad SDKs"
description: "Why we built AppLock and Reef with zero network permissions, local-only encrypted storage, and open-source licensing."
pubDate: "Sep 22 2024"
---

Security and utility apps on Android have a troubled history. Over the past decade, dozens of popular "app lockers" and "digital wellbeing monitors" have been caught harvesting location data, selling device identifiers to ad networks, or injecting intrusive background popups.

When we founded [aload0](https://github.com/aload0) and built **AppLock** and **Reef**, we started from a fundamental principle: **utility software that monitors what you do on your device has no business connecting to the internet.**

## The Zero-Network Permission Rule

The most reliable security guarantee is physical inability: if an app has no network permission (`android.permission.INTERNET`), it cannot leak data to a remote telemetry server, full stop.

Both AppLock and Reef are architected without `INTERNET` permission in their production manifests. This means:
- No tracking SDKs (Google Analytics, Firebase Telemetry, AppsFlyer, etc.).
- No ad networks or monetization analytics.
- No remote command-and-control servers.

Everything stays on your phone.

## Hardware-Backed Authentication

For AppLock, we bypass proprietary fingerprint and PIN storage routines entirely. Instead, we interface directly with the official Android `BiometricPrompt` and Android KeyStore infrastructure:

1. **Hardware Enclave (StrongBox / TEE):** Key material is stored inside the device's secure hardware element.
2. **Overlay Protection:** Launch interception uses Android's window manager overlay system with anti-tampering guards to prevent other applications from observing keystrokes or bypassing security layers.
3. **Anti-Uninstall Guards:** Preventing malicious users from simply clearing package data or uninstalling the locker from system settings.

```kotlin
// Android KeyStore delegation ensuring cryptographic hardware validation
val keyGenerator = KeyGenerator.getInstance(
    KeyProperties.KEY_ALGORITHM_AES,
    "AndroidKeyStore"
)
val keyGenParameterSpec = KeyGenParameterSpec.Builder(
    KEY_NAME,
    KeyProperties.PURPOSE_ENCRYPT or KeyProperties.PURPOSE_DECRYPT
)
    .setBlockModes(KeyProperties.BLOCK_MODE_CBC)
    .setUserAuthenticationRequired(true)
    .setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_PKCS7)
    .build()

keyGenerator.init(keyGenParameterSpec)
keyGenerator.generateKey()
```

## Mindful Friction in Reef

For Reef, our goal was to combat compulsive phone habits. Unlike typical commercial screen time blockers that lock features behind monthly subscriptions, Reef treats attention as a personal right:

- **Mindful Launch:** Rather than slamming an app closed abruptly, Reef introduces a configurable pause—a 5-second breathing moment that forces you to acknowledge whether opening the app is intentional or a subconscious habit loop.
- **Routines & Schedules:** Time windows set up through Android's `WorkManager` reliably activate focus modes with minimal battery drain.

## Distribution Through F-Droid and IzzyOnDroid

Because closed-source app stores introduce opaque review criteria (such as automated flags on overlay permissions), both apps are distributed directly on **F-Droid** and **IzzyOnDroid**. Users can verify build reproducibility, audit the source code on GitHub, and install clean, uncompromised binaries.

