/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'arabic': ['Noto Sans Arabic', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [
    // Plugin para soporte RTL
    function({ addUtilities }) {
      const newUtilities = {
        '.rtl': {
          direction: 'rtl',
        },
        '.ltr': {
          direction: 'ltr',
        },
      };
      addUtilities(newUtilities);
    }
  ],
  // Configuración de variantes RTL
  variants: {
    extend: {
      margin: ['rtl'],
      padding: ['rtl'],
      textAlign: ['rtl'],
      borderWidth: ['rtl'],
      borderRadius: ['rtl'],
    }
  }
};
