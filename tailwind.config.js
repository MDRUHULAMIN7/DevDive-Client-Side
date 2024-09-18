/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pm-color': '#54ACDD', 
        'sec-color': '#279EDA',
        'themeColor' : "#18191A",
        'themeColor2' : "#242526",
      },
    },
  },
  plugins: [],
}
