---
name: "Reef"
tagline: "An open-source digital wellbeing and focus app."
description: "Blocks distracting apps, tracks screen time, and schedules focus routines. No ads, no subscriptions, no tracking."
tech:
  - "Kotlin"
  - "Jetpack Compose"
  - "Material 3"
  - "WorkManager"
  - "Room"
stars: 369
forks: 45
github: "https://github.com/aload0/Reef"
featured: true
order: 3
screenshots:
  - src: "https://github.com/aload0/Reef/raw/main/fastlane/metadata/android/en-US/images/phoneScreenshots/01.png"
    caption: "Reef home dashboard: Daily screen time trends, active routine timeline, and focus state"
    alt: "Reef dashboard screen"
  - src: "https://github.com/aload0/Reef/raw/main/fastlane/metadata/android/en-US/images/phoneScreenshots/02.png"
    caption: "Per-app daily time allowances and gentle notification threshold settings"
    alt: "App limits configuration"
  - src: "https://github.com/aload0/Reef/raw/main/fastlane/metadata/android/en-US/images/phoneScreenshots/03.png"
    caption: "Automated focus routines: schedule distraction blocks across custom days and hours"
    alt: "Daily routine scheduler"
  - src: "https://github.com/aload0/Reef/raw/main/fastlane/metadata/android/en-US/images/phoneScreenshots/04.png"
    caption: "Interactive hourly usage breakdowns and historical behavioral analytics"
    alt: "Screen time statistics"
  - src: "https://github.com/aload0/Reef/raw/main/fastlane/metadata/android/en-US/images/phoneScreenshots/05.png"
    caption: "Pomodoro focus timer with configurable work-to-break intervals and system DND trigger"
    alt: "Focus mode session"
  - src: "https://github.com/aload0/Reef/raw/main/fastlane/metadata/android/en-US/images/phoneScreenshots/06.png"
    caption: "Mindful Launch: A deliberate breathing pause before opening compulsive apps"
    alt: "Mindful launch prompt"
features:
  - "Per-app daily time allowances with early warning notifications"
  - "Automated focus routines scheduled by day of week and time window"
  - "Mindful Launch breathing pause before opening distracting apps"
  - "Pomodoro and Count-Up focus timers with automatic Do Not Disturb (DND) toggle"
  - "On-device screen time analytics and hourly usage breakdowns"
  - "No ads, no subscriptions, no tracking. MIT licensed and available on IzzyOnDroid"
---

Most digital wellbeing apps lock basic timers behind subscriptions or bundle ad/analytics SDKs that track the exact usage habits you're trying to fix. I built **Reef** as a completely free, MIT-licensed Android app where every timer, routine, and usage chart stays strictly on your device.

## What Reef Does

- **App Limits & Early Warnings:** Set daily time budgets per app and receive a gentle heads-up before you hit the cutoff and get locked out.
- **Scheduled Routines:** Create recurring focus schedules by day and time window (for example, weekday mornings) to block distracting apps automatically while keeping essential tools accessible.
- **Mindful Launch:** Adds a brief breathing pause before opening selected apps, just enough friction to break the autopilot muscle-memory of opening social feeds.
- **Focus Timers & DND:** Built-in Pomodoro and open-ended Count-Up timers with configurable work/break intervals and automatic Android Do Not Disturb integration.
- **Local Usage Insights:** Daily and hourly screen time breakdowns stored locally, with zero cloud sync or external telemetry.

## Technical Stack

- **UI:** 100% Kotlin with Jetpack Compose and Material You / Material 3 dynamic theming.
- **System Integration:** Uses Android `UsageStatsManager`, `AccessibilityService`, and `NotificationManager` for foreground detection and DND control.
- **Background Scheduling:** `WorkManager` handles routine transitions reliably without draining battery.
- **Persistence & Distribution:** Local Room database, community translations via Weblate, and reproducible builds distributed on IzzyOnDroid.

[&rarr; Read more: Designing Privacy-First Android Apps in a World of Ad SDKs](/blog/privacy-first-android-architecture/)
