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
      },
      animation: {
        wiggle: 'wiggle 2s ease-out infinite',
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
