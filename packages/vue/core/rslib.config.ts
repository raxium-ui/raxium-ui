import { pluginBabel } from '@rsbuild/plugin-babel'
import { pluginVueJsx } from '@rsbuild/plugin-vue-jsx'
import { defineConfig } from '@rslib/core'
import { pluginUnpluginVue } from 'rsbuild-plugin-unplugin-vue'

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
        './src/composables/**',
        './src/providers/**',
        './src/utils/**',
        '!./src/**/examples/**',
        '!./src/**/*.stories.ts',
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
  plugins: [
    pluginBabel({
      include: /\.(?:jsx|tsx)$/,
    }),
    pluginVueJsx(),
    pluginUnpluginVue(),
  ],
})
