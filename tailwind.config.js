/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#C00000",
          100: "#c61a1a",
          200: "#cd3333",
          300: "#d34d4d",
          400: "#d96666",
          500: "#ad0000",
          600: "#9a0000",
          700: "#860000",
          800: "#730000",
        },
      },
      screens: {
        sm: "640px",
        // => @media (min-width: 640px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "1024px",
        // => @media (min-width: 1024px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }

        lm: "1366px", // laptop-medium
        // => @media (min-width: 1366px) { ... }

        ls: "1440px", // laptop-standard
        // => @media (min-width: 1440px) { ... }

        "2xl": "1536px",
        // => @media (min-width: 1536px) { ... }

        "3xl": "1920px",
        // => @media (min-width: 1920px) { ... }
      },
    },
  },
  plugins: [],
};
