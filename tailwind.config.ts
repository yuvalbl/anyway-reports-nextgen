// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  theme: {
    extend: {
      colors: {
        anywayYellow: '#ffd82b',
        anywayOrange: '#ff9f1c',
        anywayRed: '#d81c32',
      },
      fontFamily: {
        sans: ['"Alef"', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
