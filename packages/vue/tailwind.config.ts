import type { Config } from 'tailwindcss'

export default {
  content: [
    './core/src/**/examples/**/*.{vue,ts,tsx}',
    './addons/**/examples/**/*.{vue,ts,tsx}',
  ],
} satisfies Config
