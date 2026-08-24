import passcrest_promo from '../assets/passcrest_promo.png';
import nomiss_promo from '../assets/nomiss_promo.jpg';

export const projects = [
    {
        id: "passcrest",
        title: "PassCrest - Offline Vault",
        headline: "Private. Powerful. Uncompromised.",
        highlightBadge: "Zero-Knowledge Architecture Guaranteed",
        tagline: "Ultra-secure, 100% offline password manager and digital safety deposit box.",
        category: "Data Security & Privacy",
        client: "In-House Product",
        platform: "Android (Native Kotlin)",
        timeline: "Completed & Maintained",
        status: "Live on Google Play",
        rating: "5.0 ★",
        url: "https://play.google.com/store/apps/details?id=com.mohitum.keeper",
        urlLabel: "Get on Google Play",
        image: passcrest_promo,
        featured: true,
        summary: "PassCrest is an offline, secure solution for managing usernames, passwords, and other sensitive information without ever touching the cloud.",

        featuresSectionTitle: "Key Features & Innovations",
        featuresSectionSubtitle: "Engineered with precision for peak security, seamless usability, and complete peace of mind.",

        architectureSectionTitle: "Security Architecture & Cryptography",
        architectureSectionSubtitle: "In-depth cryptographic design, hardware key isolation, and zero-egress threat modeling.",

        overview: `In an era of relentless cloud data breaches and corporate surveillance, PassCrest was built on a simple uncompromising principle: your most sensitive credentials should never leave your physical device.

PassCrest provides users with a zero-knowledge, 100% offline vault for passwords, credit card info, bank details, and confidential notes. By eliminating internet permissions completely from the app manifest, PassCrest guarantees mathematical and architectural immunity against remote leaks, server outages, and man-in-the-middle attacks.`,

        challenge: `Balancing rigorous military-grade cryptography with an effortless, modern user experience. Traditional offline password managers are either clunky, lack biometric conveniences, or force complicated backup rituals. The goal was to build an app that is as intuitive as leading cloud managers while maintaining strict air-gapped zero-trust security.`,

        solution: `Engineered from the ground up using native Android technologies with Android KeyStore, hardware-backed AES-256-GCM encryption, biometric hardware integration, and SQLCipher. Added instant one-tap password generator, categorized vaults, search & filter capabilities, and password-protected encrypted backup/restore files that users can securely transfer anywhere.`,

        metrics: [
            { label: "Cloud Dependency", value: "0%", description: "100% Local Device Storage" },
            { label: "Encryption Standard", value: "AES-256", description: "Hardware-Backed GCM" },
            { label: "Network Permissions", value: "None", description: "Zero internet access in Manifest" },
            { label: "Decryption Latency", value: "< 10ms", description: "Near-instant biometric access" },
        ],

        keyFeatures: [
            {
                title: "100% Air-Gapped & Offline",
                description: "PassCrest requests zero internet permissions. Your data is stored strictly in local encrypted storage and never transmitted over any network.",
                iconName: "ShieldCheck"
            },
            {
                title: "AES-256 Hardware Encryption",
                description: "All vault records are sealed using AES-256-GCM with unique cryptographic salts, authenticated with Android KeyStore hardware security module.",
                iconName: "Lock"
            },
            {
                title: "Biometric Quick Unlock",
                description: "Seamlessly access credentials with Fingerprint or Face Biometric authentication with configurable automatic locking timers.",
                iconName: "Fingerprint"
            },
            {
                title: "Encrypted Backup & Restore",
                description: "Create password-encrypted backup archives of your vault to safely move your data to a new device without risking plain text exposure.",
                iconName: "HardDriveDownload"
            },
            {
                title: "Customizable Password Generator",
                description: "Generate highly entropy-rich, tamper-proof passwords tailored with custom rules, character sets, and memorable passphrases.",
                iconName: "KeyRound"
            },
            {
                title: "Categorized Vault & Smart Search",
                description: "Organize logins, credit cards, secure notes, and personal identities with instant fuzzy search and custom tagging.",
                iconName: "FolderKanban"
            }
        ],

        techStack: [
            { category: "Platform & Language", items: ["Android Native", "Kotlin", "Java"] },
            { category: "Architecture", items: ["MVVM", "Clean Architecture", "Coroutines & Flow", "Jetpack Lifecycle"] },
            { category: "Security & Cryptography", items: ["Android KeyStore", "AES-256-GCM", "SQLCipher", "BiometricPrompt API", "PBKDF2 Key Derivation"] },
            { category: "UI & Design System", items: ["Material Design 3", "Dynamic Theming", "Dark Mode", "Custom Animations"] }
        ],

        architectureHighlights: [
            {
                title: "Hardware-Backed Master Key",
                detail: "Cryptographic keys are generated inside the Android KeyStore System (TEE / StrongBox when available), preventing extraction even on rooted devices.",
                iconName: "Key"
            },
            {
                title: "Zero Network Manifest Security",
                detail: "The AndroidManifest.xml contains no android.permission.INTERNET, ensuring provable peace of mind that data cannot egress.",
                iconName: "ShieldCheck"
            },
            {
                title: "Encrypted SQLite with SQLCipher",
                detail: "Every byte written to storage is encrypted on-the-fly with 256-bit AES, protecting against file-level forensic extraction.",
                iconName: "Database"
            },
            {
                title: "Memory Scrubbing & Secure Screen",
                detail: "Sensitive variables are cleared from memory post-use and FLAG_SECURE blocks screenshots or app-switcher previews.",
                iconName: "EyeOff"
            }
        ]
    },
    {
        id: "no-miss",
        title: "No Miss: Smart To-Do",
        headline: "Never Miss What Matters. Intelligent Task Mastery.",
        tagline: "A proactive, smart to-do and routine companion designed to eliminate task paralysis with zero friction.",
        category: "Productivity",
        client: "In-House Product",
        platform: "Android (Native Kotlin)",
        timeline: "In Development",
        status: "Coming Soon",
        url: null,
        image: nomiss_promo,
        featured: true,
        summary: "No Miss transforms everyday task management with natural language input, intelligent contextual reminders, focus blocks, and habit tracking.",

        featuresSectionTitle: "Smart Capabilities & Workflow Features",
        featuresSectionSubtitle: "Designed to keep you in flow state with minimal input friction and intelligent prioritization.",

        architectureSectionTitle: "Technical Architecture & Offline Engine",
        architectureSectionSubtitle: "Local-first persistence, on-device natural language parsing, and reactive event streams.",

        overview: `Modern task management apps often become digital graveyards of forgotten tasks due to rigid input rituals and notification fatigue. **No Miss: Smart To-Do** was created to fundamentally fix task follow-through.

By combining instant natural language quick-capture with adaptive contextual nudges, No Miss surfaces the right task at the right energy level and time. Built on a local-first reactive architecture, users experience instant responsiveness whether working offline on a flight or syncing across multiple mobile devices.`,

        challenge: `Building an ultra-fast on-device natural language parser that accurately interprets dates, priority tags, and recurring cycles without introducing server latency or compromising privacy. Additionally, scheduling high-precision alarms on both iOS and Android without triggering aggressive OS battery management throttling.`,

        solution: `Implemented an on-device rule-based tokenizer and heuristic date parsing engine running in microseconds. Paired with platform-native background workers (WorkManager on Android and BackgroundTasks on iOS) to batch schedule notifications and synchronization efficiently.`,

        metrics: [
            { label: "Capture Speed", value: "< 2s", description: "Natural Language Quick Add" },
            { label: "Offline Availability", value: "100%", description: "Local SQLite / Drift Engine" },
            { label: "Battery Impact", value: "< 1%", description: "Optimized Background Alarms" },
            { label: "Sync Latency", value: "< 50ms", description: "Reactive State Streams" },
        ],

        keyFeatures: [
            {
                title: "Natural Language Quick Capture",
                description: "Type or dictate 'Review wireframes tomorrow at 4pm #work' and watch it automatically parse dates, priority, and categories.",
                iconName: "Zap"
            },
            {
                title: "Contextual Smart Reminders",
                description: "Dynamic nudges that adapt to your schedule and time-of-day rather than spamming intrusive static alarms.",
                iconName: "Bell"
            },
            {
                title: "Integrated Focus & Flow Timer",
                description: "Built-in Pomodoro cycles with ambient focus modes to transition seamlessly from planning into deep execution.",
                iconName: "Activity"
            },
            {
                title: "Habit Streaks & Velocity",
                description: "Track daily recurring rituals, streaks, completion heatmaps, and weekly productivity metrics.",
                iconName: "BarChart3"
            },
            {
                title: "Subtask Hierarchies & Checklists",
                description: "Break complex multi-step goals into actionable subtasks with visual milestone progress bars.",
                iconName: "FolderKanban"
            },
            {
                title: "Offline-First Cloud Sync",
                description: "Instantaneous local storage that functions completely offline and resolves multi-device conflicts seamlessly.",
                iconName: "RefreshCw"
            }
        ],

        techStack: [
            { category: "Mobile Framework", items: ["Flutter / Dart", "Kotlin Multiplatform", "Material You (M3)"] },
            { category: "State & Architecture", items: ["Bloc / Riverpod", "Clean Architecture", "Reactive Streams"] },
            { category: "Storage & Persistence", items: ["SQLite / Drift", "Secure Storage Keyring", "CRDT Sync Engine"] },
            { category: "System & Scheduling", items: ["Android WorkManager", "iOS BackgroundTasks", "Local Notifications"] }
        ],

        architectureHighlights: [
            {
                title: "On-Device Natural Language Parser",
                detail: "Custom tokenizer evaluates dates, recurring patterns, and priority heuristics locally with zero cloud API latency or privacy risk.",
                iconName: "Cpu"
            },
            {
                title: "Optimized WorkManager Scheduling",
                detail: "Clusters background tasks to comply with Android Doze mode and iOS Background Refresh limits while guaranteeing timely reminders.",
                iconName: "Workflow"
            },
            {
                title: "Conflict-Free Replicated Data (CRDT)",
                detail: "Timestamp-vector sync model ensures seamless state reconciliation when multiple devices make offline edits simultaneously.",
                iconName: "Database"
            },
            {
                title: "Secure Vault for Private Lists",
                detail: "Allows users to protect confidential agendas, personal goals, and private notes behind Biometric authentication.",
                iconName: "Lock"
            }
        ]
    }
];

export const getProjectById = (id) => {
    return projects.find((p) => p.id === id);
};


