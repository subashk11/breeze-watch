const { addDynamicIconSelectors } = require('@iconify/tailwind');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,css}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    addDynamicIconSelectors()
  ],
}

