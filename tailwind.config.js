/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#101416",
        surface: "#182024",
        surface2: "#222B2F",
        ink: "#E7E8E3",
        mute: "#9AA5A3",
        accent: "#91AAA5",
        line: "rgba(255,255,255,0.12)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      keyframes: { fadein: { from: { opacity: 0 }, to: { opacity: 1 } } },
      animation: { fadein: "fadein 1.4s ease-out both" },
    },
  },
  plugins: [],
};
