/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode:'class',
  theme: {
    extend: {
      colors: {
        "primary" : "#5d87ff",
        "primary-bg": "#5d87ff",
      }
    },
  },
  plugins: [],
}
