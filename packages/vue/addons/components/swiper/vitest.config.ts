import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@raxium/vue-addons-shared': resolve(__dirname, '../../shared/src/index.ts'),
    },
  },
  test: {
    environment: 'happy-dom',
    include: ['src/**/__test__/**/*.test.ts'],
  },
})
