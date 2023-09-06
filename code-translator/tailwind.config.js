/** @type {import('tailwindcss').Config} */

module.exports = {
  purge: [
    './src/**/*.jsx', // Include all JavaScript files in the src directory
    './public/index.html', // Include your HTML file(s) as well
  ],
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
}

