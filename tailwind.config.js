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
        'themeColor' : "#0E1113",
        'themeColor2' : "#181C1F",
        'themeColor3' : "#2A3236",
      },
    },
  },
  plugins: [],
}
