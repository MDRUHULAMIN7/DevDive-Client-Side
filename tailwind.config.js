const withMT = require("@material-tailwind/html/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
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
      fontFamily: {
        Montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
});
