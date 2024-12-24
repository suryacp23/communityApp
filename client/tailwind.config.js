import { list } from 'postcss';

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['"poppins"', "sans-serif"], // Add your custom font here
        customFont: ['"YourCustomFont"', "serif"], // Example for local fonts
        mochiy: ['"Mochiy Pop One"', "sans-serif"],
      },
      colors: {
        primary: "#1F1F1F",
        secondary: "#AB57Fa",
        background: "#31312f",
        lightrose: "#df73c4",
        lightblue:"#1cd0c7",
        accent: "#1abc9c",
        richblack: "#0D0C1D",
        oxford_blue: "#161B33",
        ultra_violet: "#474973",
        lavender_bush: "#F6E8EA",
        robin_blue: "#06BCC1",
        new_blue: "#152138",
      },
      animation: {
        spin: "spin 2s linear infinite",
      },
      keyframes: {
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
};
