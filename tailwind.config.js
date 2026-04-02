/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        artBlack: "#000000",
        artWhite: "#FFFFFF",
      },
      backdropBlur: {
        xs: "1px",
      },
      fontFamily: {
        body: ['Dosis', 'sans-serif'],
        heading: ['"Josefin Sans"', 'sans-serif'],
      },
      keyframes: {
        shimmer: {
          "0%": { "background-position": "-200% 0" },
          "100%": { "background-position": "200% 0" },
        },
      },
      animation: {
        shimmer: "shimmer 8s linear infinite",
      },
    },
  },
  plugins: [],
};