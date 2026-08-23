import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Plus Jakarta Sans", "Inter", "sans-serif"],
        display: ["Outfit", "sans-serif"],
        tech: ["Space Grotesk", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        handwriting: ["Caveat", "cursive", "sans-serif"],
      },
      colors: {
        border: "rgba(255, 255, 255, 0.1)",
        input: "rgba(255, 255, 255, 0.08)",
        ring: "#ffffff",
        background: "#08080a",
        foreground: "#ededed",
        silver: {
          100: "#f4f4f6",
          200: "#e4e5e9",
          300: "#d1d3d9",
          400: "#9fa3af",
          500: "#6e7382",
          600: "#4b505c",
        },
      },
    },
  },
  plugins: [tailwindAnimate],
} satisfies Config;
