import { defineConfig } from '@rsbuild/core'
import { pluginBabel } from '@rsbuild/plugin-babel'
import { pluginVue } from '@rsbuild/plugin-vue'
import { pluginVueJsx } from '@rsbuild/plugin-vue-jsx'

export default defineConfig({
  resolve: {
    alias: {
      '@raxium/vue': './core/src',
      '@raxium/shared': '../shared/src',
      '@raxium/themes': '../themes/src',
      '@raxium/vue-addons-shared': './addons/shared/src',
    },
  },
  plugins: [
    pluginBabel({
      include: /\.(?:jsx|tsx)$/,
      exclude: ['node_modules/**/*'],
    }),
    pluginVueJsx(),
    pluginVue(),
  ],
})
