import type { Meta } from 'storybook-vue3-rsbuild'

import BasicExample from './examples/basic.vue'
import BasicExampleRaw from './examples/basic.vue?raw'
import CustomSlotsExample from './examples/custom-slots.vue'
import CustomSlotsExampleRaw from './examples/custom-slots.vue?raw'
import SizesExample from './examples/sizes.vue'
import SizesExampleRaw from './examples/sizes.vue?raw'
import StatesAndOrientationExample from './examples/states-and-orientation.vue'
import StatesAndOrientationExampleRaw from './examples/states-and-orientation.vue?raw'
import VariantsExample from './examples/variants.vue'
import VariantsExampleRaw from './examples/variants.vue?raw'

const meta: Meta = {
  title: 'Components/RadioGroup',
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

export const Variants = {
  parameters: {
    docs: {
      source: {
        code: VariantsExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: VariantsExample },
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

export const StatesAndOrientation = {
  parameters: {
    docs: {
      source: {
        code: StatesAndOrientationExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: StatesAndOrientationExample },
    template: '<Component />',
  }),
}

export const CustomSlots = {
  parameters: {
    docs: {
      source: {
        code: CustomSlotsExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: CustomSlotsExample },
    template: '<Component />',
  }),
}

