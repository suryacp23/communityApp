/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['"poppins"', "sans-serif"], // Add your custom font here
        customFont: ['"YourCustomFont"', "serif"], // Example for local fonts
      },
      colors: {
        primary: "#ecf0f1",
        secondary: "#34495e",
        background: "#7f8c8d",
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
