/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6EBE8E',
        secondary: '#EAF7EE',
        accent: '#A9E0B4',
        danger: '#E63946',
        background: '#F7FFF9',
        surface: '#FFFFFF',
      },
    },
  },
  plugins: [],
};
