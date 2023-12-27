/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        translateBackAndFourth: {
          '0%, 100%': { transform: 'translateX(75%)' },
          '50%': { transform: 'translateX(0%)' },
        }
      },
      animation: {
        translateBackAndFourth: 'translateBackAndFourth 2s linear infinite',
      }
    },
  },
  plugins: [],
}
