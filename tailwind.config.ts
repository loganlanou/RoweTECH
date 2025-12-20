import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        '3xl': '1920px',
        '4xl': '2560px',
      },
      colors: {
        // RoweTECH Brand Colors
        primary: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#D97470',  // lighter red
          500: '#C65D59',  // main red (--rowetech-red)
          600: '#BE5753',  // darker red (--rowetech-red-dark)
          700: '#A64844',
          800: '#8B3C39',
          900: '#742F2D',
          950: '#5C2422',
        },
        secondary: {
          50: '#DEF0EE',   // offwhite (--rowetech-offwhite)
          100: '#D0DDDB',  // lightgray (--rowetech-lightgray)
          200: '#B4BCBB',  // midgray (--rowetech-midgray)
          300: '#939998',  // gray-1 (--rowetech-gray-1)
          400: '#757A78',  // gray-2 (--rowetech-gray-2)
          500: '#6A706D',  // gray-3 (--rowetech-gray-3)
          600: '#5C6160',  // charcoal (--rowetech-charcoal)
          700: '#4A4F4E',
          800: '#393D3C',
          900: '#282B2A',
          950: '#1A1C1B',
        },
        // Semantic aliases for easier use
        rowetech: {
          red: '#C65D59',
          'red-dark': '#BE5753',
          offwhite: '#DEF0EE',
          lightgray: '#D0DDDB',
          midgray: '#B4BCBB',
          'gray-1': '#939998',
          'gray-2': '#757A78',
          'gray-3': '#6A706D',
          charcoal: '#5C6160',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'grid-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        'hero-gradient': 'linear-gradient(135deg, #DEF0EE 0%, #D0DDDB 50%, #DEF0EE 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
