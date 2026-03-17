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
        primary: { DEFAULT: '#1B4F8C', light: '#4A90D9', dark: '#0D2B4E' },
        secondary: { DEFAULT: '#FFFFFF' },
        accent: { DEFAULT: '#C8963E', light: '#E8B86D' },
        cream: { DEFAULT: '#F5F0E8' },
      },
    },
  },
  plugins: [],
};
export default config;
