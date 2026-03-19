import type { Meta } from 'storybook-vue3-rsbuild'

import BasicExample from './examples/basic.vue'
import BasicExampleRaw from './examples/basic.vue?raw'
import ControlledExample from './examples/controlled.vue'
import ControlledExampleRaw from './examples/controlled.vue?raw'
import SizesExample from './examples/sizes.vue'
import SizesExampleRaw from './examples/sizes.vue?raw'
import StatesExample from './examples/states.vue'
import StatesExampleRaw from './examples/states.vue?raw'
import WithLabelExample from './examples/with-label.vue'
import WithLabelExampleRaw from './examples/with-label.vue?raw'

const meta: Meta = {
  title: 'Components/Switch',
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

export const WithLabel = {
  parameters: {
    docs: {
      source: {
        code: WithLabelExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: WithLabelExample },
    template: '<Component />',
  }),
}

export const Controlled = {
  parameters: {
    docs: {
      source: {
        code: ControlledExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: ControlledExample },
    template: '<Component />',
  }),
}
