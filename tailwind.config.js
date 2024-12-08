/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        customColor: {
          default: "var(--custom-color-default)",
        },
      },
    },
  },
  plugins: [],
};

