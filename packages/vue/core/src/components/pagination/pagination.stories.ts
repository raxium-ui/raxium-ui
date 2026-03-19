import type { Meta } from 'storybook-vue3-rsbuild'

import BasicExample from './examples/basic.vue'
import BasicExampleRaw from './examples/basic.vue?raw'
import ControlledExample from './examples/controlled.vue'
import ControlledExampleRaw from './examples/controlled.vue?raw'
import EventsExample from './examples/events.vue'
import EventsExampleRaw from './examples/events.vue?raw'
import LinkTypeExample from './examples/link-type.vue'
import LinkTypeExampleRaw from './examples/link-type.vue?raw'
import MinimalExample from './examples/minimal.vue'
import MinimalExampleRaw from './examples/minimal.vue?raw'
import SizesExample from './examples/sizes.vue'
import SizesExampleRaw from './examples/sizes.vue?raw'

const meta: Meta = {
  title: 'Components/Pagination',
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

export const Events = {
  parameters: {
    docs: {
      source: {
        code: EventsExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: EventsExample },
    template: '<Component />',
  }),
}

export const LinkType = {
  parameters: {
    docs: {
      source: {
        code: LinkTypeExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: LinkTypeExample },
    template: '<Component />',
  }),
}

