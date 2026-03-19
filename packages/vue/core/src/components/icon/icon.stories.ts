import type { Meta } from 'storybook-vue3-rsbuild'

import BasicExample from './examples/basic.vue'
import BasicExampleRaw from './examples/basic.vue?raw'
import ColorAndClassExample from './examples/color-and-class.vue'
import ColorAndClassExampleRaw from './examples/color-and-class.vue?raw'
import SizesExample from './examples/sizes.vue'
import SizesExampleRaw from './examples/sizes.vue?raw'

const meta: Meta = {
  title: 'Components/Icon',
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

export const ColorAndClass = {
  parameters: {
    docs: {
      source: {
        code: ColorAndClassExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: ColorAndClassExample },
    template: '<Component />',
  }),
}

