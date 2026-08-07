import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./sections/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: {
          off: "#FAFAF8",
          white: "#FFFFFF",
        },
        navy: {
          DEFAULT: "#0B1526",
          soft: "#1B2740",
        },
        electric: {
          DEFAULT: "#2B4DFF",
          dark: "#1E3AE0",
          50: "#EEF1FF",
        },
        skyline: {
          DEFAULT: "#8FB3FF",
          light: "#DCE6FF",
        },
        line: {
          DEFAULT: "#DCE3F0",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        xl2: "20px",
        xl3: "28px",
      },
      boxShadow: {
        soft: "0 8px 30px -8px rgba(11, 21, 38, 0.10)",
        softer: "0 4px 16px -4px rgba(11, 21, 38, 0.08)",
        lift: "0 20px 40px -12px rgba(43, 77, 255, 0.20)",
      },
      backgroundImage: {
        "grad-sky": "linear-gradient(135deg, #EEF3FF 0%, #FAFAF8 55%, #FFFFFF 100%)",
        "grad-electric": "linear-gradient(135deg, #2B4DFF 0%, #5A78FF 100%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
