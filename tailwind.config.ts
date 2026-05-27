import type { Config } from "tailwindcss";

const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#020617", // slate-950
        card: "#0f172a",       // slate-900
        border: "#1e293b",     // slate-800
        muted: "#94a3b8",      // slate-400
        foreground: "#ffffff", // white
        primary: {
          DEFAULT: "#fbbf24",  // amber-400
          hover: "#fcd34d",    // amber-300
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
