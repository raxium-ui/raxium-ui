import type { Meta } from 'storybook-vue3-rsbuild'

import BasicExample from './examples/basic.vue'
import BasicExampleRaw from './examples/basic.vue?raw'
import PrefixSuffixAndUiExample from './examples/prefix-suffix-and-ui.vue'
import PrefixSuffixAndUiExampleRaw from './examples/prefix-suffix-and-ui.vue?raw'
import SizesExample from './examples/sizes.vue'
import SizesExampleRaw from './examples/sizes.vue?raw'
import StatesExample from './examples/states.vue'
import StatesExampleRaw from './examples/states.vue?raw'

const meta: Meta = {
  title: 'Components/Input',
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

export const States = {
  parameters: {
    docs: {
      source: {
        code: StatesExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: StatesExample },
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

export const PrefixSuffixAndUi = {
  parameters: {
    docs: {
      source: {
        code: PrefixSuffixAndUiExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: PrefixSuffixAndUiExample },
    template: '<Component />',
  }),
}

