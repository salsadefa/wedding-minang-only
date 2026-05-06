/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        maroon: '#7B1A1A',
        gold: '#C49A2A',
        ivory: '#F5E6C8',
        cream: '#FDF8F3',
      },
      fontFamily: {
        cormorant: ['"Cormorant Garamond"', 'serif'],
      },
    },
  },
  plugins: [],
}
