import type { StorybookConfig } from 'storybook-vue3-rsbuild'
import { mergeRsbuildConfig } from '@rsbuild/core'

function patchVueDocgenRule(rules: any[] = []) {
  for (const rule of rules) {
    if (Array.isArray(rule.oneOf))
      patchVueDocgenRule(rule.oneOf)
    if (Array.isArray(rule.rules))
      patchVueDocgenRule(rule.rules)

    const uses = Array.isArray(rule.use)
      ? rule.use
      : rule.use
        ? [rule.use]
        : []

    const loaderName = typeof rule.loader === 'string' ? rule.loader : ''
    const hasVueDocgen = uses.some((u: any) => {
      const loader = typeof u === 'string' ? u : (u?.loader ?? '')
      return String(loader).includes('vue-docgen-loader')
    }) || loaderName.includes('vue-docgen-loader')

    if (hasVueDocgen) {
      rule.resourceQuery = { not: [/raw$/] }
      // vue-docgen-api 暂不支持 Vue 3.5 generic 语法，排除使用 generic 的组件
      const genericExclude = /(tree[\\/]Tree|theme[\\/]ThemeProvider|select[\\/]Select)\.vue$/
      rule.exclude = rule.exclude
        ? Array.isArray(rule.exclude)
          ? [...rule.exclude, genericExclude]
          : [rule.exclude, genericExclude]
        : genericExclude
    }
  }
}

const config: StorybookConfig = {
  stories: [
    '../core/src/**/*.mdx',
    '../core/src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../addons/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../addons/**/*.mdx',
  ],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y', '@storybook/addon-themes'],
  framework: {
    name: 'storybook-vue3-rsbuild',
    options: {},
  },
  rsbuildFinal(baseConfig) {
    const merged = mergeRsbuildConfig(baseConfig, {
      tools: {
        bundlerChain(chain, { CHAIN_ID }) {
          chain.module.rule(CHAIN_ID.RULE.VUE).resourceQuery({ not: /raw$/ })
          chain.module.rule('raw').resourceQuery(/raw$/).type('asset/source')
        },
      },
    })
    return mergeRsbuildConfig(merged, {
      tools: {
        rspack(rspackConfig) {
          patchVueDocgenRule(rspackConfig.module?.rules as any[])
          return rspackConfig
        },
      },
    })
  },
}

export default config
