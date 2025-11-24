import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Esto es vital para que lea tus componentes
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config