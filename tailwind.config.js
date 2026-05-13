/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-inter)", "sans-serif"],
                display: ["var(--font-orbitron)", "sans-serif"],
            },
            container: {
                center: true,
                padding: "2rem",
                screens: {
                    "2xl": "1400px",
                },
            },
            colors: {
                void: "#030008", // Very deep purple/black
                primary: "#E11D48", // Vibrant rose/red (Netflix-like accent)
                secondary: "#7C3AED", // Deep violet
                tertiary: "#3B82F6", // Bright blue
                panel: "rgba(255, 255, 255, 0.03)",
                border: "rgba(255, 255, 255, 0.08)",
                netflix: {
                    red: "#E50914",
                    dark: "#141414"
                }
            },
            animation: {
                "spin-slow": "spin 20s linear infinite",
                "shimmer": "shimmer 2s linear infinite",
                "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                "float": "float 6s ease-in-out infinite",
            },
            keyframes: {
                shimmer: {
                    from: { backgroundPosition: "0 0" },
                    to: { backgroundPosition: "-200% 0" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-20px)" },
                }
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "glass-gradient": "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)",
                "cinematic-gradient": "linear-gradient(to bottom right, #7C3AED, #E11D48, #F59E0B)",
            }
        },
    },
    plugins: [],
};
