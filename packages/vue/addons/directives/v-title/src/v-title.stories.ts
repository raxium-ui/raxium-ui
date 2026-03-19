import type { Meta } from 'storybook-vue3-rsbuild'
import BasicExample from './examples/basic.vue'
import BasicExampleRaw from './examples/basic.vue?raw'
import './index.css'

const meta: Meta = {
  title: 'Addons/Directives/v-title',
}

export default meta

export const Basic = {
  parameters: {
    docs: {
      source: {
        code: BasicExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: BasicExample },
    template: '<Component />',
  }),
}
