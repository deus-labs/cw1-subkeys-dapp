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
        "deus-blue": "#001EFF",
        "deus-red": "#F81F01",
        "deus-text": "rgba(198, 201, 216, 0.75)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
