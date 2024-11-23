import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Add your custom colors here
        'P-Green1': '#738065',
        'P-Green2': '#A6AE9D',
        'S-Orange': '#F5A228',
        'Text1': '#313131',
        'Text2': '#606060',
        
      },
    },
  },
  plugins: [],
} satisfies Config;
