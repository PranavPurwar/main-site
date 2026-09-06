export const SITE_TITLE = "invokevirtual";
export const SITE_DESCRIPTION =
	"I build developer tools, JVM compilers, and privacy-first software for Android.";
export const SITE_URL = "https://invokevirtual.org";
export const CONTACT_EMAIL = "contact@invokevirtual.org";

export const GITHUB_USERNAME = "PranavPurwar";
export const GITHUB_DISPLAY = "invoke";
export const AVATAR_URL =
	"https://avatars.githubusercontent.com/u/75154889?v=4";

export interface Project {
	name: string;
	slug: string;
	tagline: string;
	description: string;
	tech: string[];
	stars: number;
	forks: number;
	github: string;
	features: string[];
	featured: boolean;
	screenshot?: string;
}

export const PROJECTS: Project[] = [
	{
		name: "Cosmic IDE",
		slug: "cosmic-ide",
		tagline: "Desktop-class development on Android with local compilers and Linux environments.",
		description:
			"A full Linux-based development environment inside an Android app. I built it with a modular plugin architecture, hosting genuine compilers, Gradle daemons, and Language Server Protocol servers directly on arm64 devices without root.",
		tech: ["Kotlin", "Jetpack Compose", "C/C++", "Zig", "Arch Linux ARM", "Gradle", "LSP"],
		stars: 726,
		forks: 101,
		github: "https://github.com/Cosmic-Ide/Cosmic-IDE",
		screenshot: "/projects/cosmic-ide.jpeg",
		features: [
			"App-private glibc compatibility layer running genuine Linux/aarch64 binaries",
			"Integrated PTY terminal with Arch Linux ARM pacman package management",
			"Language Server Protocol support (Eclipse JDT LS, Metals for Scala, Kotlin LS)",
			"Modular plugin architecture separating contracts, runtime, and UI",
			"Local Gradle and Maven daemon execution on device hardware",
			"Optimized for touch, hardware keyboards, and Samsung DeX desktop mode",
		],
		featured: true,
	},
	{
		name: "AppLock",
		slug: "applock",
		tagline: "Open-source Android app locker with zero telemetry and hardware biometric authentication.",
		description:
			"A lightweight, privacy-first application locker for Android. Built with Jetpack Compose and Material 3, it enforces security through hardware-backed biometrics and window manager overlays with zero network permissions and zero tracking.",
		tech: [
			"Kotlin",
			"Jetpack Compose",
			"Material 3",
			"BiometricPrompt",
			"Room",
			"SQLCipher",
		],
		stars: 862,
		forks: 73,
		github: "https://github.com/aload0/AppLock",
		screenshot: "/projects/applock.png",
		features: [
			"Zero network permissions in manifest — zero analytics, zero trackers",
			"BiometricPrompt integrated with hardware Secure Element / StrongBox",
			"High-priority WindowManager overlay interception",
			"Anti-uninstall protection for user apps and system package settings",
			"Granular unlock timeouts (immediate, screen off, or custom interval)",
			"Distributed transparently on F-Droid and IzzyOnDroid",
		],
		featured: true,
	},
	{
		name: "Reef",
		slug: "reef",
		tagline: "Open-source digital wellbeing and focus tool with scheduled routines and Mindful Launch.",
		description:
			"An open-source digital wellbeing application that blocks distracting apps, tracks screen time analytics, and automates focus routines. Built with Material 3 Expressive, with zero ads, subscriptions, or outbound tracking.",
		tech: ["Kotlin", "Jetpack Compose", "Material 3", "WorkManager", "Room"],
		stars: 337,
		forks: 38,
		github: "https://github.com/aload0/Reef",
		screenshot: "/projects/reef.png",
		features: [
			"Per-app daily time allowances with early notification warnings",
			"Automated focus routines scheduled by time window and day of week",
			"Mindful Launch breathing friction to interrupt reflexive phone habits",
			"Pomodoro and Count-Up focus timers with automatic DND mode toggle",
			"Local on-device usage statistics and interactive hourly charts",
			"Zero ads, zero subscriptions, zero tracking — published on F-Droid",
		],
		featured: true,
	},
	{
		name: "javac-android",
		slug: "javac-android",
		tagline: "Standalone OpenJDK Java compiler ported for Android ART runtimes.",
		description:
			"My port of upstream OpenJDK javac adapted to run inside Android's ART environment and PRoot userlands. Compiles modern Java source code directly on mobile hardware without cloud dependencies.",
		tech: ["Java", "OpenJDK", "Android ART", "Bionic"],
		stars: 5,
		forks: 0,
		github: "https://github.com/PranavPurwar/javac-android",
		features: [
			"Full javac compiler supporting Java 21 through Java 26 language specifications",
			"Module system support with bundled ct.sym symbol database for target releases",
			"Heap-conscious filesystem wrappers avoiding ART memory-mapped IO limits",
			"Published on JitPack as a drop-in dependency for mobile IDEs",
		],
		featured: false,
	},
	{
		name: "kotlinc-android",
		slug: "kotlinc-android",
		tagline: "Standalone Kotlin compiler pipeline adapted for on-device mobile compilation.",
		description:
			"My port of the JetBrains Kotlin compiler toolchain adapted for Android ART runtimes. Integrates an in-memory virtual JAR filesystem to deliver fast on-device Kotlin compilation for mobile developer tools.",
		tech: ["Kotlin", "Java", "Android ART", "fastJarFileSystem"],
		stars: 30,
		forks: 0,
		github: "https://github.com/PranavPurwar/kotlinc-android",
		features: [
			"Kotlin 2.4 and 2.5 compiler support including the K2 pipeline",
			"fastJarFileSystem in-memory indexing to accelerate mobile JAR scanning",
			"Joint compilation alongside javac-android in mixed Java/Kotlin trees",
			"Packaged as a lightweight JitPack artifact focused exclusively on JVM targets",
		],
		featured: false,
	},
];
