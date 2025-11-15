import defaultTheme from "tailwindcss/defaultTheme";
import tailwindcssAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1400px"
      }
    },
    extend: {
      colors: {
        background: "#05040d",
        foreground: "#e5e7ff",
        muted: "#4c4c63",
        border: "rgba(255,255,255,0.08)",
        card: "#0b0a1a",
        accent: {
          DEFAULT: "#38bdf8",
          neon: "#8b5cf6",
          pink: "#fb37ff"
        }
      },
      fontFamily: {
        grotesk: ["var(--font-space-grotesk)", ...defaultTheme.fontFamily.sans]
      },
      boxShadow: {
        glow: "0 0 35px rgba(139,92,246,0.45)",
        "glow-blue": "0 0 30px rgba(56,189,248,0.45)"
      },
      backgroundImage: {
        "grid-glow":
          "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.07) 1px, transparent 0)"
      }
    }
  },
  plugins: [tailwindcssAnimate]
};

export default config;
