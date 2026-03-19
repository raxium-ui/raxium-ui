import type { Meta } from 'storybook-vue3-rsbuild'

import BasicExample from './examples/basic.vue'
import BasicExampleRaw from './examples/basic.vue?raw'
import InitialStateExample from './examples/initial-state.vue'
import InitialStateExampleRaw from './examples/initial-state.vue?raw'
import MinSizeExample from './examples/min-size.vue'
import MinSizeExampleRaw from './examples/min-size.vue?raw'
import MinimalExample from './examples/minimal.vue'
import MinimalExampleRaw from './examples/minimal.vue?raw'
import ResizeAxisExample from './examples/resize-axis.vue'
import ResizeAxisExampleRaw from './examples/resize-axis.vue?raw'

const meta: Meta = {
  title: 'Components/FloatingPanel',
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

export const Minimal = {
  parameters: {
    docs: {
      source: {
        code: MinimalExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: MinimalExample },
    template: '<Component />',
  }),
}

export const ResizeAxis = {
  parameters: {
    docs: {
      source: {
        code: ResizeAxisExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: ResizeAxisExample },
    template: '<Component />',
  }),
}

export const MinSize = {
  parameters: {
    docs: {
      source: {
        code: MinSizeExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: MinSizeExample },
    template: '<Component />',
  }),
}

export const InitialState = {
  parameters: {
    docs: {
      source: {
        code: InitialStateExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: InitialStateExample },
    template: '<Component />',
  }),
}
