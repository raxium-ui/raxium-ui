import type { Meta } from 'storybook-vue3-rsbuild'

import BasicExample from './examples/basic.vue'
import BasicExampleRaw from './examples/basic.vue?raw'
import CircleAndArcExample from './examples/circle-and-arc.vue'
import CircleAndArcExampleRaw from './examples/circle-and-arc.vue?raw'
import CustomUiExample from './examples/custom-ui.vue'
import CustomUiExampleRaw from './examples/custom-ui.vue?raw'
import LinearVariantsExample from './examples/linear-variants.vue'
import LinearVariantsExampleRaw from './examples/linear-variants.vue?raw'
import SizesAndOrientationExample from './examples/sizes-and-orientation.vue'
import SizesAndOrientationExampleRaw from './examples/sizes-and-orientation.vue?raw'

const meta: Meta = {
  title: 'Components/Progress',
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

export const LinearVariants = {
  parameters: {
    docs: {
      source: {
        code: LinearVariantsExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: LinearVariantsExample },
    template: '<Component />',
  }),
}

export const SizesAndOrientation = {
  parameters: {
    docs: {
      source: {
        code: SizesAndOrientationExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: SizesAndOrientationExample },
    template: '<Component />',
  }),
}

export const CircleAndArc = {
  parameters: {
    docs: {
      source: {
        code: CircleAndArcExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: CircleAndArcExample },
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

