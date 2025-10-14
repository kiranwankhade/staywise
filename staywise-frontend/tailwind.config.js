// module.exports = {
//   content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./contexts/**/*.{ts,tsx}"],
//   theme: {
//   extend: {},
//   },
//   plugins: [],
//   }

// module.exports = {
//   content: [
//     // Include files in the src directory using the App Router structure
//     "./src/**/*.{js,ts,jsx,tsx,mdx}", 
    
//     // KEEP these if you still have files outside src (less common in new projects)
//     // "./pages/**/*.{js,ts,jsx,tsx,mdx}", 
//     // "./components/**/*.{js,ts,jsx,tsx,mdx}", 
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
module.exports = {
  // CRITICAL: Ensure the src directory is scanned
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/context/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // StayWise Theme Colors
        'sw-primary': '#a07d4c', // Golden/Brown Accent
        'sw-secondary': '#f8f4ed', // Light Beige Background
        'sw-dark': '#3c3127', // Dark Text/Accent
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // You can customize this
        serif: ['Georgia', 'serif'],
      },
      boxShadow: {
        'xl': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
      }
    },
  },
  plugins: [],
}