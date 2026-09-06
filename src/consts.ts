export const SITE_TITLE = "Pranav Purwar";
export const SITE_DESCRIPTION =
	"Systems engineer building developer tools, JVM tooling, and privacy-first software for Android.";

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
		name: "AppLock",
		slug: "applock",
		tagline: "Privacy tool to secure your sensitive apps.",
		description:
			"A modern, lightweight, privacy-focused application lock for Android built with Jetpack Compose and Material 3. Supports biometric and PIN authentication, anti-uninstall protection, and zero tracking. Available on F-Droid.",
		tech: [
			"Kotlin",
			"Jetpack Compose",
			"Material 3",
			"Biometric API",
			"Room",
		],
		stars: 862,
		forks: 73,
		github: "https://github.com/aload0/AppLock",
		screenshot: "/projects/applock.png",
		features: [
			"Biometric and secure PIN authentication per app",
			"Anti-uninstall and tamper protection",
			"Material 3 dynamic theming",
			"Zero tracking, zero ads, fully open source",
			"Available on F-Droid and IzzyOnDroid",
		],
		featured: true,
	},
	{
		name: "Cosmic IDE",
		slug: "cosmic-ide",
		tagline:
			"A desktop-class IDE for Android, powered by a full Linux environment.",
		description:
			"An open-source, general-purpose integrated development environment built for Android devices. Powered by an embedded Arch Linux ARM environment with pacman integration, it provides real compilers, Gradle builds, LSP diagnostics, a full terminal, and Git support — all running offline on a phone or tablet.",
		tech: ["Kotlin", "Java", "C/C++", "Arch Linux ARM", "Gradle", "LSP"],
		stars: 726,
		forks: 101,
		github: "https://github.com/Cosmic-Ide/Cosmic-IDE",
		screenshot: "/projects/cosmic-ide.jpeg",
		features: [
			"Full embedded Arch Linux ARM environment (no root required)",
			"Package management via pacman",
			"Java, Kotlin, C, C++, Scala, and Zig compilation",
			"Language Server Protocol support",
			"Integrated terminal and Git version control",
			"Bytecode disassembly and inspection",
		],
		featured: true,
	},
	{
		name: "Reef",
		slug: "reef",
		tagline: "Stay focused. Block distractions. Own your screen time.",
		description:
			"An open-source digital wellbeing app that blocks distracting apps, sets daily routines, and provides screen time insights — without ads, clutter, or tracking. Built with Material You design principles.",
		tech: ["Kotlin", "Jetpack Compose", "Material You", "Android"],
		stars: 337,
		forks: 38,
		github: "https://github.com/aload0/Reef",
		screenshot: "/projects/reef.png",
		features: [
			"Per-app blocking with customizable schedules",
			"Daily routine and focus mode management",
			"Screen time analytics and insights",
			"Material You dynamic theming",
			"No ads, no tracking, fully open source",
		],
		featured: true,
	},
	{
		name: "javac-android",
		slug: "javac-android",
		tagline: "Ported JDK compiler for Android runtime.",
		description:
			"A port of the standard JDK Java compiler (javac) adapted to run natively within the Android runtime environment. Enables on-device Java compilation for mobile IDEs and developer tools.",
		tech: ["Java", "JDK", "Android Runtime"],
		stars: 5,
		forks: 0,
		github: "https://github.com/PranavPurwar/javac-android",
		features: [
			"Full javac compiler running on Android",
			"Compatible with Android's Dalvik/ART runtime",
			"Used by Cosmic IDE and other mobile IDEs",
		],
		featured: false,
	},
	{
		name: "kotlinc-android",
		slug: "kotlinc-android",
		tagline: "Kotlin and Java compiler port for Android.",
		description:
			"A custom port and adaptation of the Kotlin compiler toolchain designed to run natively on Android devices. Provides on-device Kotlin compilation for mobile development environments and IDEs.",
		tech: ["Kotlin", "Java", "Android Runtime"],
		stars: 30,
		forks: 0,
		github: "https://github.com/PranavPurwar/kotlinc-android",
		features: [
			"Full Kotlin compiler running on Android",
			"Java compiler integration",
			"Designed for mobile IDE integration",
		],
		featured: false,
	},
	{
		name: "gpujs-real-renderer",
		slug: "gpujs-real-renderer",
		tagline: "Real-time 2D GPU-accelerated rendering with GPU.js.",
		description:
			"A library built on GPU.js for real-time 2D graphical rendering, mathematical visualizations, and interactive drawing boards — all hardware-accelerated via WebGL shader kernels.",
		tech: ["TypeScript", "GPU.js", "WebGL", "HTML5 Canvas"],
		stars: 6,
		forks: 0,
		github: "https://github.com/PranavPurwar/gpujs-real-renderer",
		features: [
			"GPU-accelerated pixel rendering via WebGL",
			"Real-time streaming line graphs",
			"Complex number space visualization",
			"Interactive GPU drawing board",
			"Runs in browser and Node.js headless",
		],
		featured: false,
	},
];
