/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        glow: "0 30px 80px rgba(250, 204, 21, 0.15)",
        luxury: "0 20px 40px -10px rgba(0,0,0,0.05), 0 0 20px rgba(250, 204, 21, 0.05)",
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top, rgba(253, 224, 71, 0.1), transparent 30%), radial-gradient(circle at 20% 90%, rgba(251, 191, 36, 0.08), transparent 24%), radial-gradient(circle at 85% 15%, rgba(245, 158, 11, 0.05), transparent 22%)",
        "gold-gradient": "linear-gradient(to right, #fef08a, #f59e0b)",
      },
      colors: {
        cream: {
          50: '#fdfbf7',
          100: '#f9f5eb',
          200: '#f1e8d1',
          300: '#e7d5ae',
          400: '#dbbe84',
        },
        gold: {
          light: '#fef08a', // yellow-200
          DEFAULT: '#eab308', // yellow-500
          dark: '#b45309', // amber-700
        },
        obsidian: "#0a0a0a",
      },
      screens: {
        "3xl": "1800px",
      },
    },
  },
  plugins: [],
};
