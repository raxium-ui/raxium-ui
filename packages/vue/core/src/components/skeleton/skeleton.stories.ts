import type { Meta } from 'storybook-vue3-rsbuild'

import BasicExample from './examples/basic.vue'
import BasicExampleRaw from './examples/basic.vue?raw'
import ShapesExample from './examples/shapes.vue'
import ShapesExampleRaw from './examples/shapes.vue?raw'
import VariantsExample from './examples/variants.vue'
import VariantsExampleRaw from './examples/variants.vue?raw'
import WithChildrenExample from './examples/with-children.vue'
import WithChildrenExampleRaw from './examples/with-children.vue?raw'

const meta: Meta = {
  title: 'Components/Skeleton',
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

export const Shapes = {
  parameters: {
    docs: {
      source: {
        code: ShapesExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: ShapesExample },
    template: '<Component />',
  }),
}

export const WithChildren = {
  parameters: {
    docs: {
      source: {
        code: WithChildrenExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: WithChildrenExample },
    template: '<Component />',
  }),
}

