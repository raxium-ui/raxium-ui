import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'

export default defineConfig({
  source: {
    entry: {
      index: './src/index.tsx',
    },
  },
  output: {
    sourceMap: {
      js: 'source-map',
      css: false,
    },
  },
  resolve: {
    alias: {
      '@': './src',
      '@raxium/react': '../../packages/react/core/src',
      '@raxium/themes': '../../packages/themes/src',
      '@raxium/shared': '../../packages/shared/src',
    },
  },
  plugins: [pluginReact()],
  server: {
    port: 4397,
  },
})
