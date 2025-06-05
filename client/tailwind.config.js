/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
                handwriting: ["Dancing Script", "cursive"],
      }
    },
  },
  plugins: [],
} 