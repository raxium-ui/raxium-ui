import type { Meta } from 'storybook-vue3-rsbuild'
import BasicExample from './examples/basic.vue'
import BasicExampleRaw from './examples/basic.vue?raw'
import EventsExample from './examples/events.vue'
import EventsExampleRaw from './examples/events.vue?raw'
import './examples/index.css'

const meta: Meta = {
  title: 'Addons/Composables/Murri',
}

export default meta

export const Basic = {
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: BasicExampleRaw,
      },
    },
  },
  render: () => ({
    components: { Component: BasicExample },
    template: '<Component />',
  }),
}

export const Events = {
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: EventsExampleRaw,
      },
    },
  },
  render: () => ({
    components: { Component: EventsExample },
    template: '<Component />',
  }),
}
