// tailwind.config.js
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    './src/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        foreground: '#000000',
        background: {
          start: '#d6dbdc',
          end: '#ffffff',
        },
        primaryGlow: 'conic-gradient(from 180deg at 50% 50%, #16abff33 0deg, #0885ff33 55deg, #54d6ff33 120deg, #0071ff33 160deg, transparent 360deg)',
        secondaryGlow: 'radial-gradient(rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))',
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
