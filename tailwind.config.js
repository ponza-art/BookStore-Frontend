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
  },
  plugins: [require('daisyui')],
};
