import type { Preview } from 'storybook-vue3-rsbuild'
import { setup } from 'storybook-vue3-rsbuild'
import { defineComponent, h } from 'vue'
import { Toast, Toaster } from '../core/src/components/toast'
import { RUIConfig } from '../core/src/providers/config'

import './style.css'

setup((app) => {
  app.config.idPrefix = `storybook@${app._uid}`
})

const preview: Preview = {
  parameters: {
    viewMode: 'docs',
    previewTabs: {
      'storybook/docs/panel': { index: 0 },
      'canvas': { index: 1 },
    },
    options: {
      storySort: {
        order: ['Utilities', 'Providers', 'Components', 'Addons'],
        method: 'alphabetical',
      },
    },
    layout: 'padded',
    actions: { disable: true },
    controls: { disable: true },
    backgrounds: {
      options: {
        black: { name: 'Black', value: '#000000' },
        dark: { name: 'Dark', value: '#222222' },
        light: { name: 'Light', value: '#eeeeee' },
      },
    },
    viewport: { disable: true },
    docs: {
      codePanel: true,
    },
  },

  initialGlobals: {
    backgrounds: { value: 'dark' },
  },

  decorators: [
    story =>
      defineComponent({
        name: 'RUIStory',
        setup() {
          return () =>
            h(
              RUIConfig,
              {},
              {
                default: () => h(story()),
                toaster: () => [
                  h(
                    Toaster,
                    { placement: 'top-end', overlap: true },
                    { default: ({ toast }) => h(Toast, { options: toast }) },
                  ),
                  h(
                    Toaster,
                    { placement: 'bottom-end', overlap: true },
                    { default: ({ toast }) => h(Toast, { options: toast }) },
                  ),
                ],
              },
            )
        },
      }),
  ],
}

export default preview
