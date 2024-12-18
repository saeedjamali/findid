/** @type {import('tailwindcss').Config} */

const {nextui} = require("@nextui-org/react");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/_components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        iranyekan: ["iranyekan"],
        iranyekanMedium: ["iranyekanMedium"],
        iranyekanBold: ["iranyekanBold"],
        shabnam: ["shabnam"],
        shabnamBold: ["shabnamBold"],
        iranSans: ["iransans"],
        vazir: ["Vazirmatn"],
        iranNastaliq: ["iranNastaliq"],
      },
      keyframes: {
        slideIn: {
          "0%": { opacity: 0, transform: "translateX(-100%)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
      },
      animation: {
        slideIn: "slideIn .25s ease-in-out forwards",
      },
      colors: {
        //just add this below and your all other tailwind colors willwork
        header: "#182B54",
        "btn-orange": "#ff431e",
        "font-light-color": "#F5F6FF",
        "tag-right-orange": "#ff8d00",
        "alarm-color": "#ff431e ",
        "success-color": "#12b96c",
        "h1-color": "#26354e",
        "h2-color": "#626A70",
        "gradiant-color-600": "#464c63",
        "gradiant-color-100": "#eff3fa",
      },
      // backgroundImage: {
      //   'hero-pattern': "url('/images/6856.jpg')",
      // }
    },
  },
  plugins: [nextui()],
};
