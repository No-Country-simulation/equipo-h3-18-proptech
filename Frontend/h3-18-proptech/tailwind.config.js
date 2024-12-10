/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
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
        "base-color": "#1E1E1E",
        background: "#F8F8F8",
        disabled: "#A0A0A0",
        success: "#2ECC71",
        error: "#C1121F",
      },
      fontFamily: {
        nunito: ["nunito", "sans-serif"],
        lato: ["lato", "sans-serif"],
      },
      fontSize: {
        "display-large-regular": [
          "56px",
          {
            lineHeight: "64px",
            letterSpacing: 0,
            fontWeight: 400,
          },
        ],
        "display-medium-regular": [
          "48px",
          {
            lineHeight: "56px",
            letterSpacing: 0,
            fontWeight: 400,
          },
        ],
        "display-small-regular": [
          "48px",
          {
            lineHeight: "56px",
            letterSpacing: 0,
            fontWeight: 400,
          },
        ],
        "display-small-bold": [
          "36px",
          {
            lineHeight: "44px",
            letterSpacing: 0,
            fontWeight: 700,
          },
        ],
        "headline-large-medium": [
          "32px",
          {
            lineHeight: "40px",
            letterSpacing: 0,
            fontWeight: 500,
          },
        ],
        "headline-medium-medium": [
          "28px",
          {
            lineHeight: "36px",
            letterSpacing: 0,
            fontWeight: 500,
          },
        ],
        "headline-small-medium": [
          "24px",
          {
            lineHeight: "32px",
            letterSpacing: 0,
            fontWeight: 400,
          },
        ],
        "headline-small-bold": [
          "24px",
          {
            lineHeight: "32px",
            letterSpacing: 0,
            fontWeight: 700,
          },
        ],
        "title-large-regular": [
          "20px",
          {
            lineHeight: "24px",
            letterSpacing: "0.15px",
            fontWeight: 400,
          },
        ],
        "title-large-semi-bold": [
          "20px",
          {
            lineHeight: "24px",
            letterSpacing: "0.15px",
            fontWeight: 600,
          },
        ],
        "title-medium-bold": [
          "16px",
          {
            lineHeight: "24px",
            letterSpacing: "0.15px",
            fontWeight: 700,
          },
        ],
        "title-small-bold": [
          "14px",
          {
            lineHeight: "20px",
            letterSpacing: "0.1px",
            fontWeight: 700,
          },
        ],
        "label-large-medium": [
          "14px",
          {
            lineHeight: "20px",
            letterSpacing: "0.1px",
            fontWeight: 500,
          },
        ],
        "label-medium-medium": [
          "12px",
          {
            lineHeight: "16px",
            letterSpacing: "0.5px",
            fontWeight: 500,
          },
        ],
        "body-large-regular": [
          "16px",
          {
            lineHeight: "24px",
            letterSpacing: "0.5px",
            fontWeight: 400,
          },
        ],
        "body-medium-regular": [
          "14px",
          {
            lineHeight: "20px",
            letterSpacing: "0.25px",
            fontWeight: 400,
          },
        ],
        "body-small-regular-12": [
          "12px",
          {
            lineHeight: "16px",
            letterSpacing: "0.4px",
            fontWeight: 400,
          },
        ],
        "body-small-regular-10": [
          "10px",
          {
            lineHeight: "16px",
            letterSpacing: "0.4px",
            fontWeight: 400,
          },
        ],
        "display-small-regular": [
          "40px",
          {
            lineHeight: "56px",
            letterSpacing: 0,
            fontWeight: 400,
          },
        ],
        "title-medium-semi-bold": [
          "16px",
          {
            lineHeight: "24px",
            letterSpacing: "0.5px",
            fontWeight: 600,
          },
        ],
        "body-small-regular-8": [
          "8px",
          {
            lineHeight: "16px",
            letterSpacing: "0.4px",
            fontWeight: 400,
          },
        ],
        "title-large-bold": [
          "20px",
          {
            lineHeight: "24px",
            letterSpacing: "0.15px",
            fontWeight: 700,
          },
        ],
      },
    },
  },
  plugins: [require("@xpd/tailwind-3dtransforms")],
};
