import type { Meta } from 'storybook-vue3-rsbuild'

import BasicExample from './examples/basic.vue'
import BasicExampleRaw from './examples/basic.vue?raw'
import PtTargetExample from './examples/pt-target.vue'
import PtTargetExampleRaw from './examples/pt-target.vue?raw'

const meta: Meta = {
  title: 'Addons/Directives/v-aria',
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

export const PtTarget = {
  parameters: {
    docs: {
      source: {
        code: PtTargetExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: PtTargetExample },
    template: '<Component />',
  }),
}
