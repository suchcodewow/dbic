/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial":
          "radial-gradient(circle at 25% 40%,rgba(0, 40, 83, 1) 0%,rgba(4, 12, 24, 1) 90%)",
      },
      fontFamily: {
        sans: ["Manrope", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        azure: {
          50: "#dae5fe",

          100: "#b3cbfe",

          200: "#89b3fe",

          300: "#559afe",

          400: "#0382f3",

          500: "#026bc8",

          600: "#025299",

          700: "#01427c",

          800: "#012e55",

          900: "#001426",
        },
        indigo: {
          50: "#e3e2fe",

          100: "#c9c5fe",

          200: "#aea9fe",

          300: "#948cfe",

          400: "#7a6efe",

          500: "#5e4dfe",

          600: "#411dfe",

          700: "#3002d1",

          800: "#230299",

          900: "#170165",
        },
        magenta: {
          50: "#fcdafe",

          100: "#fab3fe",

          200: "#f887fe",

          300: "#f74dfe",

          400: "#e703ef",

          500: "#b902bf",

          600: "#940299",

          700: "#78017c",

          800: "#530155",

          900: "#250026",
        },
        crimson: {
          50: "#fedcdf",

          100: "#feb9c0",

          200: "#fe939f",

          300: "#fe677b",

          400: "#fe1b4d",

          500: "#d6033d",

          600: "#af0232",

          700: "#840226",

          800: "#65011d",

          900: "#420113",
        },
        orange: {
          50: "#feded3",

          100: "#febca3",

          200: "#fe9869",

          300: "#f87603",

          400: "#d16402",

          500: "#b05402",

          600: "#843f02",

          700: "#693201",

          800: "#4c2401",

          900: "#261200",
        },
        lime_green: {
          50: "#c0f503",

          100: "#aede03",

          200: "#9cc702",

          300: "#80a402",

          400: "#708f02",

          500: "#597101",

          600: "#435501",

          700: "#344201",

          800: "#2a3601",

          900: "#1e2600",
        },
        green: {
          50: "#88fe87",

          100: "#0ae903",

          200: "#09d102",

          300: "#08b302",

          400: "#069402",

          500: "#068002",

          600: "#046501",

          700: "#034201",

          800: "#023601",

          900: "#022600",
        },
        turquoise: {
          50: "#68fec6",

          100: "#03e5a6",

          200: "#02ce95",

          300: "#02a879",

          400: "#02946b",

          500: "#02805d",

          600: "#016549",

          700: "#014230",

          800: "#013627",

          900: "#00261c",
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
  ],
};
