// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  // This `content` array is the crucial part.
  // It tells Tailwind to scan all .ts, .tsx, .js, and .jsx files
  // inside the 'pages' and 'components' directories.
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
