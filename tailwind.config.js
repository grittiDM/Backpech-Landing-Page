
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
    extend: {
      colors: {
        // Paleta principal customizada
        bpPrimary: '#8f3f71',
        bpSecondary: '#076678',
        bpAccent: '#fe8019',
        bpBgLight: '#f9f5d7',
        bpBgDark: '#282828',
        bpTxtLight: '#282828',
        bpTxtDark: '#f9f5d7',
        bpRed: '#cc241d',
        bpGreen: '#b8bb26',
        bpYellow: '#fabd2f',
        bpBlue: '#076678',
        bpPurple: '#8f3f71',
        bpAqua: '#689d6a',
        // Tons de cinza customizados
        bpGray: {
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
        // Mantém transparent e current para compatibilidade
        transparent: 'transparent',
        current: 'currentColor',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        chakra: ['Chakra Petch', 'sans-serif'],
      },
      spacing: {
        128: '32rem',
        144: '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};