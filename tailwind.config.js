/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#1b2a5a",
          deep: "#121e42",
          soft: "#3d4f7a",
          muted: "#6b7a9e",
          mist: "#eef1f8",
        },
        gold: {
          DEFAULT: "#c9a227",
          soft: "#e8d48a",
          mist: "#f7f1de",
        },
        heart: {
          DEFAULT: "#c41e3a",
          soft: "#f3d4da",
        },
        cream: {
          DEFAULT: "#fffcf7",
          warm: "#f8f4ec",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out forwards",
        "fade-in": "fade-in 0.8s ease-out forwards",
      },
    },
  },
  plugins: [],
};
