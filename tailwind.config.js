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
            colors: {
                void: "#030014",
                neon: {
                    blue: "#00f0ff",
                    purple: "#d8b4fe",
                    white: "#F8FAFC",
                    green: "#00ff9d",
                }
            },
            animation: {
                "spin-slow": "spin 20s linear infinite",
                "shimmer": "shimmer 2s linear infinite",
            },
            keyframes: {
                shimmer: {
                    from: { backgroundPosition: "0 0" },
                    to: { backgroundPosition: "-200% 0" },
                },
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
            }
        },
    },
    plugins: [],
};
