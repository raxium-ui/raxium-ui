import type { Meta } from 'storybook-vue3-rsbuild'

import ArraySrcExample from './examples/array-src.vue'
import ArraySrcExampleRaw from './examples/array-src.vue?raw'
import BackgroundExample from './examples/background.vue'
import BackgroundExampleRaw from './examples/background.vue?raw'
import BasicExample from './examples/basic.vue'
import BasicExampleRaw from './examples/basic.vue?raw'
import ScrollContainerExample from './examples/scroll-container.vue'
import ScrollContainerExampleRaw from './examples/scroll-container.vue?raw'

const meta: Meta = {
  title: 'Addons/Directives/v-lazy',
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

export const Background = {
  parameters: {
    docs: {
      source: {
        code: BackgroundExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: BackgroundExample },
    template: '<Component />',
  }),
}

export const ScrollContainer = {
  parameters: {
    docs: {
      source: {
        code: ScrollContainerExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: ScrollContainerExample },
    template: '<Component />',
  }),
}

export const ArraySrc = {
  parameters: {
    docs: {
      source: {
        code: ArraySrcExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: ArraySrcExample },
    template: '<Component />',
  }),
}
