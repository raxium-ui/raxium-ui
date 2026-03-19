import type { Meta } from 'storybook-vue3-rsbuild'

import BasicExample from './examples/basic.vue'
import BasicExampleRaw from './examples/basic.vue?raw'
import ControlledExample from './examples/controlled.vue'
import ControlledExampleRaw from './examples/controlled.vue?raw'
import DisabledAndNoIndicatorExample from './examples/disabled-and-no-indicator.vue'
import DisabledAndNoIndicatorExampleRaw from './examples/disabled-and-no-indicator.vue?raw'
import ScrollableListExample from './examples/scrollable-list.vue'
import ScrollableListExampleRaw from './examples/scrollable-list.vue?raw'
import SizesExample from './examples/sizes.vue'
import SizesExampleRaw from './examples/sizes.vue?raw'

const meta: Meta = {
  title: 'Components/Tabs',
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

export const ScrollableList = {
  parameters: {
    docs: {
      source: {
        code: ScrollableListExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: ScrollableListExample },
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

export const DisabledAndNoIndicator = {
  parameters: {
    docs: {
      source: {
        code: DisabledAndNoIndicatorExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: DisabledAndNoIndicatorExample },
    template: '<Component />',
  }),
}

