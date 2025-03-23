/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        tableShadow: "0px 4px 20px 0px #0000001A",
        bottom: "0 4px 6px rgba(0, 0, 0, 0.4)", // Customize the shadow as needed
      },
      colors: {
        primary: "#78222E",
        danger:'#78222E'
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities(
        {
          ".scrollbar-hide": {
            /* For Firefox */
            "scrollbar-width": "none",
            /* For Internet Explorer and Edge */
            "-ms-overflow-style": "none",
          },
          ".scrollbar-hide::-webkit-scrollbar": {
            /* For Chrome, Safari, and Opera */
            display: "none",
          },
        },
        ["responsive", "hover"]
      );
    },
  ],
};
