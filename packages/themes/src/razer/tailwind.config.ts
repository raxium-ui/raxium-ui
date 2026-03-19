import type { Config } from 'tailwindcss'

export default {
  content: [
    './**/*.{ts}',
    '../default/**/*.{ts}',
    '../../../vue/core/src/**/*.{vue,ts,tsx}',
    '!../../../vue/core/src/**/examples/**/*.{vue,ts,tsx}',
  ],
} satisfies Config
