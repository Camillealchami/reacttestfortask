// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust this path based on your project structure
  ],
  theme: {
    extend: {
      fontFamily: {
        enter: ['Enter', 'sans-serif'], // Add the Enter font
      },
      backgroundImage: {
        'gradient-custom': 'linear-gradient(to right, #ff7e5f, #feb47b)', // Custom gradient
      },
    },
  },
  plugins: [],
};