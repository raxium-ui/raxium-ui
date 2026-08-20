import type { StorybookConfig } from 'storybook-react-rsbuild'

const config: StorybookConfig = {
  stories: [
    '../core/src/**/*.mdx',
    '../core/src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y', '@storybook/addon-themes'],
  framework: {
    name: 'storybook-react-rsbuild',
    options: {},
  },
}

export default config
