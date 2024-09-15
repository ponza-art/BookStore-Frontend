/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brown: {
          200: '#dab26d', // درجة اللون البني
        },
      },
    },
    screens: {
      'sm': '450px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    }
   
  },
  extend: {},

  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      "light",
    ],
  },
};
