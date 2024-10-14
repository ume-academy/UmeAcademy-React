/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        title: ["FontTitle", "sans-serif"],
        subtitle: ["FontSubTitle", "sans-serif"],
        desc: ["FontDesc", "sans-serif"],
      }
    },
  },
  plugins: [],
}

