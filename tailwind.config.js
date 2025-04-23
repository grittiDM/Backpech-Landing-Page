const { plugin } = require("postcss");

module.exports = {
  content: ["./*.html", "./**/*.html"], // Monitora todos os HTMLs
  darkMode: "class",                    // Alinhado com seu dark mode existente
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#f9f5d7',
          dark: '#282828'
        },
        secondary: "#8338ec",
      },
    },
  },
  plugins: [],                          // Pode adicionar plugins depois
};