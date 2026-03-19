import type { Meta } from 'storybook-vue3-rsbuild'

import BasicExample from './examples/basic.vue'
import BasicExampleRaw from './examples/basic.vue?raw'
import ControlledExample from './examples/controlled.vue'
import ControlledExampleRaw from './examples/controlled.vue?raw'
import MultipleExample from './examples/multiple.vue'
import MultipleExampleRaw from './examples/multiple.vue?raw'
import OrientationAndDisabledExample from './examples/orientation-and-disabled.vue'
import OrientationAndDisabledExampleRaw from './examples/orientation-and-disabled.vue?raw'
import SizesExample from './examples/sizes.vue'
import SizesExampleRaw from './examples/sizes.vue?raw'
import WithIconsExample from './examples/with-icons.vue'
import WithIconsExampleRaw from './examples/with-icons.vue?raw'

const meta: Meta = {
  title: 'Components/ToggleGroup',
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

export const OrientationAndDisabled = {
  parameters: {
    docs: {
      source: {
        code: OrientationAndDisabledExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: OrientationAndDisabledExample },
    template: '<Component />',
  }),
}

export const Multiple = {
  parameters: {
    docs: {
      source: {
        code: MultipleExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: MultipleExample },
    template: '<Component />',
  }),
}

export const WithIcons = {
  parameters: {
    docs: {
      source: {
        code: WithIconsExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: WithIconsExample },
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

