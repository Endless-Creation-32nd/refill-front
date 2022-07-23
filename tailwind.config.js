/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'mint-main': '#24D7CC',
        'mint-sub': '#DEF8F6',
        bgColor: '#FBFBFB',
        'light-gray': '#E4E4E4',
        'middle-gray': '#939393',
        warning: '#FF0000',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
  ],
};
