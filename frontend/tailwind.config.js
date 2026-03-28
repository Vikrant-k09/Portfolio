/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"DM Sans"', 'sans-serif']
      },
      boxShadow: {
        soft: 'var(--shadow)',
        lift: 'var(--shadow-hover)'
      }
    }
  },
  plugins: []
};
