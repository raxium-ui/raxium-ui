import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'

export default defineConfig({
  resolve: {
    alias: {
      '@raxium/react': './core/src',
      '@raxium/shared': '../shared/src',
      '@raxium/themes': '../themes/src',
    },
  },
  plugins: [pluginReact()],
})
