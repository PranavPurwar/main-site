---
name: "Reef"
tagline: "Open-source digital wellbeing and focus tool with scheduled routines and Mindful Launch."
description: "An open-source digital wellbeing application that blocks distracting apps, tracks screen time analytics, and automates focus routines. Built with Material 3 Expressive, with zero ads, subscriptions, or outbound tracking."
tech:
  - "Kotlin"
  - "Jetpack Compose"
  - "Material 3"
  - "WorkManager"
  - "Room"
stars: 337
forks: 38
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
  - "Per-app daily time allowances with early notification warnings"
  - "Automated focus routines scheduled by time window and day of week"
  - "Mindful Launch breathing friction to interrupt reflexive phone habits"
  - "Pomodoro and Count-Up focus timers with automatic DND mode toggle"
  - "Local on-device usage statistics and interactive hourly charts"
  - "Zero ads, zero subscriptions, zero tracking — published on F-Droid"
---

I built Reef to provide intentional screentime control through local system services rather than subscriptions or behavioural profiling. It contains zero ads, zero subscriptions, and zero tracking. All usage metrics and session records remain strictly on the device.

## Core Focus Mechanics

- **Daily App Allowances & Warnings**  
  Enforces granular time budgets for individual applications, providing customizable notification warnings as users approach daily thresholds before locking access.
- **Scheduled Focus Routines**  
  Constructs recurring blocking schedules across specific days and time windows (e.g., Deep Work on weekday mornings), restricting distracting apps while keeping communications open.
- **Mindful Launch Friction**  
  Inserts a deliberate breathing pause countdown before opening designated compulsive apps, creating friction that breaks reflexive phone-checking loops.
- **Pomodoro & Count-Up Timers**  
  Pairs structured Pomodoro intervals with open-ended Count-Up focus sessions, automatically managing Do Not Disturb (DND) suppression and calculating focus-to-break ratios.

## Technical Specifications

- **UI Architecture:** 100% Kotlin with declarative Jetpack Compose and Material 3 Expressive theming.
- **System Integrations:** Android `UsageStatsManager`, `AccessibilityService`, and `NotificationManager` DND suppression.
- **Background Engine:** Battery-efficient `WorkManager` jobs for scheduled routine transitions.
- **Local Privacy:** Encrypted SQLite database via Room with zero outbound network telemetry.
- **Open Distribution:** Reproducible source builds published via F-Droid and IzzyOnDroid with Weblate localization.

## In-Depth Focus & Privacy Engineering

For more context on intentional screentime mechanics, zero-network architecture, and Mindful Launch design, read my article:

[&rarr; Designing Privacy-First Android Apps in a World of Ad SDKs](/blog/privacy-first-android-architecture/)

