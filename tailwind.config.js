/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream:   '#faf7f2',
        surface: '#f2ede5',
        edge:    '#e0d8cc',
        ink:     '#1c1a17',
        muted:   '#7a7068',
        faint:   '#c8c0b4',
      },
      fontFamily: {
        sans:  ['Jost', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'serif'],
      },
    },
  },
  plugins: [],
};

