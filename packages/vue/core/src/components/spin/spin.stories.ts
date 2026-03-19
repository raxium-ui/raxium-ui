import type { Meta } from 'storybook-vue3-rsbuild'

import BasicExample from './examples/basic.vue'
import BasicExampleRaw from './examples/basic.vue?raw'
import CustomIconExample from './examples/custom-icon.vue'
import CustomIconExampleRaw from './examples/custom-icon.vue?raw'
import DelayAndTextExample from './examples/delay-and-text.vue'
import DelayAndTextExampleRaw from './examples/delay-and-text.vue?raw'
import ModesExample from './examples/modes.vue'
import ModesExampleRaw from './examples/modes.vue?raw'
import SizesExample from './examples/sizes.vue'
import SizesExampleRaw from './examples/sizes.vue?raw'

const meta: Meta = {
  title: 'Components/Spin',
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

export const Modes = {
  parameters: {
    docs: {
      source: {
        code: ModesExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: ModesExample },
    template: '<Component />',
  }),
}

export const DelayAndText = {
  parameters: {
    docs: {
      source: {
        code: DelayAndTextExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: DelayAndTextExample },
    template: '<Component />',
  }),
}

export const CustomIcon = {
  parameters: {
    docs: {
      source: {
        code: CustomIconExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: CustomIconExample },
    template: '<Component />',
  }),
}
