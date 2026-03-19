import type { Meta } from 'storybook-vue3-rsbuild'

import BasicExample from './examples/basic.vue'
import BasicExampleRaw from './examples/basic.vue?raw'
import BothAxesExample from './examples/both-axes.vue'
import BothAxesExampleRaw from './examples/both-axes.vue?raw'
import CustomUiExample from './examples/custom-ui.vue'
import CustomUiExampleRaw from './examples/custom-ui.vue?raw'
import SizesExample from './examples/sizes.vue'
import SizesExampleRaw from './examples/sizes.vue?raw'

const meta: Meta = {
  title: 'Components/ScrollArea',
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

export const BothAxes = {
  parameters: {
    docs: {
      source: {
        code: BothAxesExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: BothAxesExample },
    template: '<Component />',
  }),
}

export const Sizes = {
  parameters: {
    docs: {
      source: {
        code: SizesExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: SizesExample },
    template: '<Component />',
  }),
}

export const CustomUi = {
  parameters: {
    docs: {
      source: {
        code: CustomUiExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: CustomUiExample },
    template: '<Component />',
  }),
}

