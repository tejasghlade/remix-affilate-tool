import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#b0cc53',
        secondary: '#cfd6df',
      },
    },
  },
  plugins: [],
} satisfies Config