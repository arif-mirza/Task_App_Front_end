/** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         brand: {
//           50: '#eff6ff',
//           100: '#dbeafe',
//           500: '#3b82f6',
//           600: '#2563eb',
//           900: '#1e3a8a',
//         }
//       }
//     },
//   },
//   plugins: [],
// }


export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
        },
        glass: 'rgba(255,255,255,0.08)',
       darkbg: '#0f172a',
        darkcard: '#0f172a',
      },
      boxShadow: {
        glow: '0 0 40px rgba(59,130,246,0.25)',
      }
    },
  },
  plugins: [],
};