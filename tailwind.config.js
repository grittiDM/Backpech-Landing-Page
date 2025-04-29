/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './index.html',
    './servicos.html',
    './contato.html',
    './src/**/*.{html,js}'
    ],
  darkMode: 'class',

  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },

    colors: {
      'primary': '#8f3f71',
      'secondar': '#076678',
      'accent': '#fe8019',
      transparent: 'transparent',
      current: 'currentColor',

      'bg': {
        light: '#f9f5d7',
        dark: '#282828',
      },

      'txt': {
        light: '#282828',
        dark: '#f9f5d7',
      },

      'gray': {
        50: '#d5c4a1',
        100: '#bdae93',
        200: '#a89984',
        300: '#928374',
        400: '#7c6f64',
        500: '#665c54',
        600: '#504945',
        700: '#3c3836',
        800: '#282828',
        900: '#1d2021',
      },

      'red': '#cc241d',
      'green': '#b8bb26',
      'yellow': '#fabd2f',
      'blue': '#076678',
      'purple': '#8f3f71',
      'aqua': '#689d6a',
    },

    opacity: {
      '80': '0.8',
      '100': '1',
    },

    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        chakra: ['Chakra Petch', 'sans-serif'],
      },

      spacing: {
        '128': '32rem',
        '144': '36rem',
      },

      borderRadius: {
        '4xl': '2rem',
      }
    }
  },

  plugins: [],
};