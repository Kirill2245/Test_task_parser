// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        screens: {
        'xs': '320px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
        sakura: {
          50: '#fff5f7',
          100: '#ffe6ec',
          200: '#ffd1dd',
          300: '#ffb7c9',
          400: '#ff9bb5',
          500: '#ff7fa1',
          600: '#ff638d',
          700: '#ff4779',
          800: '#ff2b65',
          900: '#ff0f51',
        },
        zen: {
          50: '#f7f5f2',
          100: '#e8e3dd',
          200: '#d4ccc2',
          300: '#bdb2a4',
          400: '#a69886',
          500: '#8f7e68',
          600: '#726454',
          700: '#554a3f',
          800: '#38312a',
          900: '#1b1714',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        japanese: ['"Noto Sans JP"', 'sans-serif'],
      },
      animation: {
        'sakura-fall': 'sakura-fall 10s linear infinite',
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
      },
      keyframes: {
        'sakura-fall': {
          '0%': { transform: 'translateY(-10vh) rotate(45deg)', opacity: '0.8' },
          '100%': { transform: 'translateY(100vh) rotate(90deg)', opacity: '0' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}