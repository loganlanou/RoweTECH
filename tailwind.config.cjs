/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './templates/**/*.html',
    './cmd/**/*.go',
  ],
  theme: {
    extend: {
      screens: {
        '3xl': '1920px',
        '4xl': '2560px',
      },
      colors: {
        primary: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#D97470',
          500: '#C65D59',
          600: '#BE5753',
          700: '#A64844',
          800: '#8B3C39',
          900: '#742F2D',
          950: '#5C2422',
        },
        secondary: {
          50: '#DEF0EE',
          100: '#D0DDDB',
          200: '#B4BCBB',
          300: '#939998',
          400: '#757A78',
          500: '#6A706D',
          600: '#5C6160',
          700: '#4A4F4E',
          800: '#2A2D2C',
          900: '#1A1D1C',
          950: '#0D0F0E',
        },
        industrial: {
          steel: '#71797E',
          iron: '#48494B',
          rust: '#8B4513',
          gunmetal: '#2A3439',
          bronze: '#CD7F32',
          spark: '#FFD700',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Oswald', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-sm': ['2.5rem', { lineHeight: '1', letterSpacing: '0.02em' }],
        'display-md': ['3.5rem', { lineHeight: '1', letterSpacing: '0.02em' }],
        'display-lg': ['5rem', { lineHeight: '0.95', letterSpacing: '0.02em' }],
        'display-xl': ['7rem', { lineHeight: '0.9', letterSpacing: '0.02em' }],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'industrial-gradient': 'linear-gradient(135deg, #0D0F0E 0%, #1A1D1C 25%, #2A3439 50%, #1A1D1C 75%, #0D0F0E 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'shine': 'shine 3s infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shine: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(198, 93, 89, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(198, 93, 89, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        industrial: '0 4px 20px rgba(0, 0, 0, 0.5)',
        'industrial-lg': '0 10px 40px rgba(0, 0, 0, 0.6)',
        glow: '0 0 30px rgba(198, 93, 89, 0.4)',
        'glow-lg': '0 0 50px rgba(198, 93, 89, 0.5)',
      },
    },
  },
  plugins: [],
};
