/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'Geist Mono Fallback', 'monospace'],
      },
      colors: {
        emerald: {
          500: '#10B981',
          900: '#064E3B',
        },
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-y': 'gradient-y 15s ease infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
        'pulse': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-slower': 'float 12s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'spin-reverse': 'spin-reverse 8s linear infinite',
        'rotate-3d': 'rotate-3d 10s ease infinite',
      },
      keyframes: {
        'gradient-y': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'center top',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'center center',
          },
        },
        'gradient-x': {
          '0%': {
            'transform': 'translateX(-100%)',
          },
          '50%': {
            'transform': 'translateX(0)',
          },
          '100%': {
            'transform': 'translateX(100%)',
          },
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        'pulse': {
          '0%, 100%': {
            opacity: 0.8,
            transform: 'scale(1)',
          },
          '50%': { 
            opacity: 0.4,
            transform: 'scale(0.95)',
          },
        },
        'float': {
          '0%, 100%': { 
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
        'spin-reverse': {
          'from': {
            transform: 'rotate(360deg)'
          },
          'to': {
            transform: 'rotate(0deg)'
          }
        },
        'rotate-3d': {
          '0%': {
            transform: 'perspective(1000px) rotateX(0) rotateY(0)'
          },
          '25%': {
            transform: 'perspective(1000px) rotateX(10deg) rotateY(10deg)'
          },
          '50%': {
            transform: 'perspective(1000px) rotateX(0) rotateY(20deg)'
          },
          '75%': {
            transform: 'perspective(1000px) rotateX(-10deg) rotateY(10deg)'
          },
          '100%': {
            transform: 'perspective(1000px) rotateX(0) rotateY(0)'
          }
        },
      },
    },
  },
  plugins: [],
}; 