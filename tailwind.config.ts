import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      screens: {
        xs: "400px",
      },
      colors: {
        crimson: {
          DEFAULT: "#B71C1C",
          deep: "#8E1414",
          soft: "#D32F2F",
        },
        cream: {
          DEFAULT: "#FFF4D6",
          light: "#FFFAEC",
        },
        gold: {
          DEFAULT: "#F5C518",
          light: "#FDE68A",
          deep: "#C9971C",
        },
        charcoal: {
          DEFAULT: "#1E1E1E",
          soft: "#2A2A2A",
        },
        muted: "#6E6E6E",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        body: ["var(--font-poppins)", "sans-serif"],
        button: ["var(--font-montserrat)", "sans-serif"],
      },
      letterSpacing: {
        luxe: "0.35em",
        wider2: "0.18em",
      },
      backgroundImage: {
        "cream-glow":
          "radial-gradient(ellipse 80% 60% at 50% 0%, #FFFAEC 0%, #FFF4D6 45%, #FBE9C4 100%)",
        "gold-line":
          "linear-gradient(90deg, transparent, #F5C518 20%, #FDE68A 50%, #F5C518 80%, transparent)",
        "crimson-fade":
          "linear-gradient(135deg, #B71C1C 0%, #8E1414 100%)",
      },
      boxShadow: {
        luxe: "0 30px 80px -30px rgba(30,30,30,0.35)",
        "luxe-gold": "0 20px 60px -25px rgba(245,197,24,0.5)",
        glass: "0 8px 40px rgba(30,30,30,0.12)",
      },
      keyframes: {
        "shimmer-sweep": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-18px) rotate(6deg)" },
        },
        "steam-rise": {
          "0%": { transform: "translateY(0) scale(1)", opacity: "0" },
          "20%": { opacity: "0.5" },
          "100%": { transform: "translateY(-140px) scale(1.8)", opacity: "0" },
        },
        // Animates transform only (GPU-composited) instead of border-radius, so
        // the expensive blur layer is never re-rasterized while it drifts.
        "blob-morph": {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(0,-16px,0) scale(1.12)" },
        },
      },
      animation: {
        "float-slow": "float-slow 8s ease-in-out infinite",
        "blob-morph": "blob-morph 14s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
