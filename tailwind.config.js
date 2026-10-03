/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./data/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#101416", surface: "#182024", surface2: "#222B2F",
        ink: "#E7E8E3", mute: "#9AA5A3", accent: "#91AAA5",
        line: "rgba(255,255,255,0.12)",
      },
      fontFamily: { sans: ["var(--font-sans)", "system-ui", "sans-serif"], mono: ["var(--font-mono)", "ui-monospace", "monospace"], hand: ["var(--font-hand)", "cursive"], type: ["var(--font-type)", "ui-monospace", "monospace"] },
      keyframes: { fadein: { "0%": { opacity: "0" }, "100%": { opacity: "1" } } },
      animation: { fadein: "fadein 1.8s ease-in forwards" },
    },
  },
  plugins: [],
};
