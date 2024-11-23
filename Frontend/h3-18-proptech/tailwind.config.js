/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3D5A80",
        primaryVar1: "#5D7595",
        primaryVar2: "#334B6B",
        secondary: "#EC8B57",
        secondaryVar1: "#E77C44",
        tertiary: "#BEC8D5",
        contrast: "#FFFFFF",
        base: "#1E1E1E",
        background: "#F8F8F8",
        disabled: "#A0A0A0",
        success: "#2ECC71",
        error: "#C1121F"
      },
      fontFamily: {
        nunito: ["nunito", "sans-serif"],
        lato: ["lato", "sans-serif"]
      }
    },
  },
  plugins: [],
};
