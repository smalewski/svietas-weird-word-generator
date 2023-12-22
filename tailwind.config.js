module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          main: "#8ed0e8",
          secondary: "#aedff7",
          neutral: "#c7ccd4",
          cta: "#9fded1",
          accent: "#c8a2c8",
        },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
