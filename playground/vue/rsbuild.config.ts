import { defineConfig } from '@rsbuild/core'
import { pluginBabel } from '@rsbuild/plugin-babel'
import { pluginSass } from '@rsbuild/plugin-sass'
import { pluginVue } from '@rsbuild/plugin-vue'
import { pluginVueJsx } from '@rsbuild/plugin-vue-jsx'

export default defineConfig({
  source: {
    entry: {
      index: './src/index.ts',
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
      '@rui-ark/vue': '../../packages/vue/core',
      '@rui-ark/themes': '../../packages/themes/src',
      '@rui-ark/shared': '../../packages/shared/src',
    },
  },
  plugins: [
    pluginSass(),
    pluginBabel({
      include: /\.(?:jsx|tsx)$/,
      exclude: ['node_modules/**/*'],
    }),
    pluginVueJsx(),
    pluginVue({
      vueLoaderOptions: {
        compilerOptions: {},
      },
    }),
  ],
  server: {
    port: 4398,
  },
})
