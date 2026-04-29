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
        './src/*',
        '!./src/examples/**',
        '!./src/swiper.stories.ts',
        '!./src/swiper.doc.mdx',
        '!./src/swiper.ai.yaml',
      ],
    },
  },
  output: {
    target: 'web',
    externals: {
      '@raxium/vue-addons-shared': '@raxium/vue-addons-shared',
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
