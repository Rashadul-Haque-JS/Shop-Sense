module.exports = {
  purge: ['./src/**/*.{js,ts,jsx,tsx}', './public/index.html'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'xs': {'max': '575.98px'},
      'sm': {'min': '576px', 'max': '767.98px'},
      'md': {'min': '768px', 'max': '991.98px'},
      'lg': {'min': '992px', 'max': '1199.98px'},
      'xl': {'min': '1200px'},
      '2xl': {'min': '1400px'},
    },
    extend: {},
  },
  plugins: [],
};
