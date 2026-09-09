---

title: "Designing Privacy-First Android Apps in a World of Ad SDKs"
description: "Why I built AppLock and Reef with zero network permissions, local-only encrypted storage, and open-source licensing."
pubDate: "Sept 4 2026"

---

Security and utility apps on Android have a troubled history. Over the past decade, dozens of popular "app lockers" and "digital wellbeing monitors" have been caught harvesting location data, selling device identifiers to ad networks, or injecting intrusive background popups.

When I founded [aload0](https://github.com/aload0) and built **AppLock** and **Reef**, I started from a fundamental principle: **utility software that monitors what you do on your device has no business connecting to the internet.**

> ### Fun Fact & Origin Stories:
>
> Neither project started in a vacuum. AppLock originally came to life following a request by a user named "Xperian" on the [QuestPhone](https://github.com/QuestPhone/questphone) Discord server, who was searching for a modern, open-source Android app locker.
>
> Reef, on the other hand, began as friendly competition against my friend's app-initially called DigiPaws, later rebranded to [Curbox](https://github.com/curbox-app/curbox-android), which was a little rough on the design and user experience at that time. While it started as an attempt to build a better alternative, Reef quickly found its own identity thanks to unique workflow, mindful interventions, and great design! Curbox, too, appears to be in a good shape, with plenty of customizations, far more than you will ever need, and really well maintained!

## The Zero-Network Permission Rule

The most reliable security guarantee is physical inability: if an app has no network permission (`android.permission.INTERNET`), it cannot leak data to a remote server, full stop.

Both AppLock and Reef are architected without `INTERNET` permission in their manifest. This means:

* No tracking SDKs (Google Analytics, Firebase Telemetry, AppsFlyer, etc.).
* No ad networks or monetization analytics.
* No remote command-and-control servers.

Everything stays on your phone.

## Hardware-Backed Authentication & Core Protection in AppLock

For [AppLock](https://github.com/aload0/AppLock), we bypass proprietary fingerprint and PIN storage routines entirely. Instead, we interface directly with the official Android `BiometricPrompt` and Android KeyStore infrastructure:

1. **Hardware Strongbox:** Keys are encrypted and stored inside the device's secure hardware element.
2. **Overlay Protection:** Launch interception uses Android's window manager overlay with anti-tampering guards to prevent other applications from observing keystrokes or bypassing security layers.
3. **Anti-Uninstall Guards:** Preventing malicious users from simply clearing package data or uninstalling the locker from system settings.

Beyond the low-level authentication layer, AppLock includes:

* **Biometric and PIN authentication:** Support for Fingerprint, Face Unlock, and PIN authentication.
* **One-tap app locking:** Lock any app on your device with real-time background protection.
* **Granular Anti-Uninstall Protection:** System-level safeguards including anti-uninstall protection for user apps.
* **Unlock Timeout for Convenience:** Configurable grace periods so you don't have to authenticate repeatedly during active sessions.
* **Root-Free Operation:** Protect apps without needing root priviledges.
* **Material You Design:** Adaptive interface that dynamically themes to your system palette.
* **Independent Security Audits:** Clean reports on [VirusTotal Analysis (v1.5.0)](https://www.virustotal.com/gui/url/ead3a434b961ce332b49398d73a10598b2cee6d665c54bb4a66c825794465d72) and [Exodus Privacy](https://reports.exodus-privacy.eu.org/en/reports/dev.pranav.applock/latest) confirming zero trackers and zero analytics.

AppLock is available on [GitHub Releases](https://github.com/PranavPurwar/AppLock/releases/latest), [F-Droid](https://f-droid.org/packages/dev.pranav.applock/), and [IzzyOnDroid](https://apt.izzysoft.de/packages/dev.pranav.applock), with bleeding-edge [Beta Builds](https://github.com/PranavPurwar/AppLock/raw/refs/heads/master/app/debug/app-debug.apk) available directly from the repository.



## Mindful Friction & Comprehensive Wellbeing in Reef

For [Reef](https://github.com/aload0/Reef), my goal was to combat compulsive phone habits. Unlike typical commercial screen time blockers that lock features behind monthly subscriptions, Reef treats attention as a personal right:

* **Mindful Launch:** Rather than slamming an app closed abruptly, Reef introduces a configurable pause—a 5-second breathing moment that forces you to acknowledge whether opening the app is intentional or a subconscious habit loop.
* **Routines & Schedules:** Time windows set up through Android's `WorkManager` reliably activate focus modes with minimal battery drain.

Reef expands on digital wellbeing with a full suite of productivity tools:

* **Focus Timer Modes:** Includes Simple Focus mode, Pomodoro mode, and a Count Up Focus Mode with configurable focus-to-break ratios.
* **Customizable Intervals:** Configurable Pomodoro durations, session sounds, and vibration alerts.
* **Application & Website Blocker:** System-level blocking for distracting applications and websites.
* **Per-App Daily Time Limits:** Configurable limits with proactive warning notifications before time expires.
* **Flexible and Strict Modes:** Tailor intervention strength from gentle reminders to locked enforcement.
* **App Usage Statistics:** Detailed screen time tracking with interactive charts and historical breakdowns.
* **Automatic Do Not Disturb:** Suppresses interruptions automatically during active focus sessions.
* **Community Localization:** Open for global translation contributions via [Weblate](https://hosted.weblate.org/engage/reef/).

You can install Reef via [GitHub Releases](https://github.com/aload0/Reef/releases) or [IzzyOnDroid](https://apt.izzysoft.de/packages/dev.pranav.reef).

## Distribution Through F-Droid and IzzyOnDroid

Because closed-source app stores introduce opaque review criteria (such as automated flags on overlay permissions), both apps are distributed directly on **F-Droid** and **IzzyOnDroid**. Users can verify build reproducibility, audit the source code on GitHub, and install clean, uncompromised binaries.