import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
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
          DEFAULT: "#D4AF37",
          light: "#E8CE7A",
          deep: "#A8862A",
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
          "linear-gradient(90deg, transparent, #D4AF37 20%, #E8CE7A 50%, #D4AF37 80%, transparent)",
        "crimson-fade":
          "linear-gradient(135deg, #B71C1C 0%, #8E1414 100%)",
      },
      boxShadow: {
        luxe: "0 30px 80px -30px rgba(30,30,30,0.35)",
        "luxe-gold": "0 20px 60px -25px rgba(212,175,55,0.45)",
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
        "blob-morph": {
          "0%, 100%": { borderRadius: "42% 58% 63% 37% / 41% 44% 56% 59%" },
          "50%": { borderRadius: "58% 42% 33% 67% / 63% 51% 49% 37%" },
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
