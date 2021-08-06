module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '10%': {
            transform: 'translateY(-15px) ',
          },
          '20%': { transform: 'rotate(-10deg) ' },
          '25% ': { transform: 'rotate(10deg) ' },
          '35%': { transform: 'rotate(-10deg) ' },
          '40%': { transform: 'rotate(0deg) ' },
          '60%': { transform: 'translateY(0)' },
        },
        dropIn: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.6) translateY(-8px)',
          },
          '100%': {
            opacity: '1',
          },
        },
      },
      animation: {
        wiggle: 'wiggle 2s ease-out infinite',
        dropIn: 'dropIn 350ms ease-in-out',
      },
    },
  },
  variants: {
    extend: {
      animation: ['hover'],
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
