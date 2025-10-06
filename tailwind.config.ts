import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './contexts/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f7f7f7',
          100: '#ebebeb',
          200: '#d6d6d6',
          300: '#b7b7b7',
          400: '#949494',
          500: '#757575',
          600: '#575757',
          700: '#3b3b3b',
          800: '#242424',
          900: '#121212'
        },
        sand: {
          50: '#f4f4f4',
          100: '#e4e4e4',
          200: '#d3d3d3',
          300: '#bfbfbf',
          400: '#aaaaaa',
          500: '#959595',
          600: '#7f7f7f',
          700: '#696969',
          800: '#525252',
          900: '#3b3b3b'
        },
        cocoa: {
          50: '#ececec',
          100: '#d8d8d8',
          200: '#c2c2c2',
          300: '#ababab',
          400: '#949494',
          500: '#7d7d7d',
          600: '#616161',
          700: '#484848',
          800: '#303030',
          900: '#171717'
        }
      },
      boxShadow: {
        soft: '0 18px 50px -25px rgba(0, 0, 0, 0.55)'
      }
    }
  },
  plugins: []
};

export default config;
