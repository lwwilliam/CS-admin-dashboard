import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['var(--font-poppins)'],
      },
      backgroundClip: {
      'text': 'text',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'lightmode-blue': '#99DEFF',
        'lightmode-white': '#FAF9F6',
        'lightmode-green': '#99FFC2',
        'lightmode-red': '#FF9999',
        'darkmode-darkblue': '#020076',
        'darkmode-black': '#121212',
        'darkmode-purple': '#5552FF',
      },  
    },
  },
  variants: {
  extend: {
    backgroundClip: ['responsive'],
  },
  },
  plugins: [
  require('@tailwindcss/typography'),
  ],
};
export default config;
