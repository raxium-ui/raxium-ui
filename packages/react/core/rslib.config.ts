import { pluginReact } from '@rsbuild/plugin-react'
import { defineConfig } from '@rslib/core'

export default defineConfig({
  lib: [
    {
      format: 'esm',
      bundle: false,
      dts: true,
    },
  ],
  source: {
    entry: {
      index: [
        './src/index.ts',
        './src/components/**',
        './src/hooks/**',
        './src/providers/**',
        './src/utils/**',
        '!./src/**/examples/**',
        '!./src/**/*.stories.ts',
        '!./src/**/*.stories.tsx',
        '!./src/**/*.md',
        '!./src/**/*.doc.mdx',
        '!./src/**/*.ai.yaml',
      ],
    },
  },
  output: {
    target: 'web',
    externals: {
      '@raxium/shared': '@raxium/shared',
      '@raxium/themes': '@raxium/themes',
    },
  },
  plugins: [pluginReact()],
})
