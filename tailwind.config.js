/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#0a0f1e",
          900: "#0d1b2a",
          800: "#0f2744",
          700: "#132f5e",
          600: "#1a3a6b",
          500: "#1e4976",
          400: "#2b5d95",
          300: "#3b78b4",
        },
        accent: {
          DEFAULT: "#60a5fa",
          hover: "#93bbfd",
        },
      },
    },
  },
  plugins: [],
};
