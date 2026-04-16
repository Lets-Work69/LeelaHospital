/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f3fb',
          100: '#cce7f7',
          200: '#99cfef',
          400: '#3da8d8',
          500: '#0969b1',
          600: '#075896',
          700: '#05477a',
          800: '#03355d',
          900: '#022441',
        },
        teal: {
          400: '#3dc9b0',
          500: '#17ae95',
          600: '#129680',
        }
      },
      fontFamily: { sans: ['Inter', 'sans-serif'] },
    },
  },
  plugins: [],
}
