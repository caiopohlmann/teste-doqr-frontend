import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#7741FB",
        primary2: "#D0C1F4",
        black: "#0B0B0C",
        gray: "#58575A",
        greenTable: "#034906",
        redTable: "#300404",
      },
      backgroundColor: {
        primary: "#7741FB",
        primary2: "#D0C1F4",
        grayTable: "#EFEDF2",
        greenTable: "#B5F8B7",
        redTable: "#FBC9C9",
      },
      borderColor: {
        gray: "#CDCAD2",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
