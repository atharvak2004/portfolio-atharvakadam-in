import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F2EDE2",
        "cream-dark": "#E9E2D2",
        ink: "#151310",
        "ink-soft": "#1D1B17",
        rust: "#EA4623",
        "rust-dark": "#C93B1C",
        forest: "#132A1C",
        "forest-light": "#1E4029",
        stone: "#8A8577",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        card: "22px",
      },
    },
  },
  plugins: [],
};

export default config;
