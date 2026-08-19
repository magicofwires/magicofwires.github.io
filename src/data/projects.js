import passcrest_promo from '../assets/passcrest_promo.png';

export const projects = [
    {
        id: "passcrest",
        title: "PassCrest - Offline Vault",
        tagline: "Ultra-secure, 100% offline password manager and digital safety deposit box.",
        category: "Data Security & Privacy",
        client: "In-House Product",
        platform: "Android (Native Kotlin)",
        timeline: "Completed & Maintained",
        status: "Live on Google Play",
        rating: "5.0 ★",
        url: "https://play.google.com/store/apps/details?id=com.mohitum.keeper",
        image: passcrest_promo,
        featured: true,
        summary: "PassCrest is an offline, secure solution for managing usernames, passwords, and other sensitive information without ever touching the cloud.",
        
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
                detail: "Cryptographic keys are generated inside the Android KeyStore System (TEE / StrongBox when available), preventing extraction even on rooted devices."
            },
            {
                title: "Zero Network Manifest Security",
                detail: "The AndroidManifest.xml contains no android.permission.INTERNET, ensuring provable peace of mind that data cannot egress."
            },
            {
                title: "Encrypted SQLite with SQLCipher",
                detail: "Every byte written to storage is encrypted on-the-fly with 256-bit AES, protecting against file-level forensic extraction."
            },
            {
                title: "Memory Scrubbing & Secure Screen",
                detail: "Sensitive variables are cleared from memory post-use and FLAG_SECURE blocks screenshots or app-switcher previews."
            }
        ]
    }
];

export const getProjectById = (id) => {
    return projects.find((p) => p.id === id);
};
