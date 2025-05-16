/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'lime-green': '#C3F53C',
        'lime-green-dark': '#598210',
        'color': '#d2ff82',
      },
    },
  },
  plugins: [],
};
