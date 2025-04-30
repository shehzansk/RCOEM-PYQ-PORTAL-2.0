// tailwind.config.js
module.exports = {
  darkMode: 'class', // or 'media'
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#3b82f6',   // Blue-500
          DEFAULT: '#2563eb', // Blue-600
        },
        secondary: {
          light: '#22c55e',   // Green-400
          DEFAULT: '#16a34a', // Green-500
        },
        background: {
          DEFAULT: 'rgba(0,0,0,0.1)',
        },
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
      },
      spacing: {
        // Custom spacing values if needed
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      backdropBlur: {
        '3xl': '64px',
      },
    },
  },
  plugins: [],
}
