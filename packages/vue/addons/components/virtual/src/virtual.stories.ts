import type { Meta } from 'storybook-vue3-rsbuild'

import BasicGridExample from './examples/basic-grid.vue'
import BasicGridExampleRaw from './examples/basic-grid.vue?raw'
import BasicListExample from './examples/basic-list.vue'
import BasicListExampleRaw from './examples/basic-list.vue?raw'
import DynamicListExample from './examples/dynamic-list.vue'
import DynamicListExampleRaw from './examples/dynamic-list.vue?raw'
import './index.css'

const meta: Meta = {
  title: 'Addons/Components/Virtual',
}

export default meta

export const BasicList = {
  parameters: {
    docs: {
      source: {
        code: BasicListExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: BasicListExample },
    template: '<Component />',
  }),
}

export const DynamicList = {
  parameters: {
    docs: {
      source: {
        code: DynamicListExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: DynamicListExample },
    template: '<Component />',
  }),
}

export const BasicGrid = {
  parameters: {
    docs: {
      source: {
        code: BasicGridExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: BasicGridExample },
    template: '<Component />',
  }),
}
