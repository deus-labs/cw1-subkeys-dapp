module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "deus-dark": "#101010",
        "deus-gray": "#191919",
        "deus-purple": "#6715FF",
        "deus-pink": "#FF00FF",
        "deus-pink-soft": "#FFA7FF",
        "deus-blue": "#001EFF",
        "deus-red": "#F81F01",
        "deus-text": "#D3D3D3",
        "deus-green": "#4BFF97",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
