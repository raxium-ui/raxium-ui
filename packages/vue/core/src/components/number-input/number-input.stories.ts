import type { Meta } from 'storybook-vue3-rsbuild'

import BasicExample from './examples/basic.vue'
import BasicExampleRaw from './examples/basic.vue?raw'
import EventsExample from './examples/events.vue'
import EventsExampleRaw from './examples/events.vue?raw'
import FormatExample from './examples/format.vue'
import FormatExampleRaw from './examples/format.vue?raw'
import ProgrammaticExample from './examples/programmatic.vue'
import ProgrammaticExampleRaw from './examples/programmatic.vue?raw'
import SizesExample from './examples/sizes.vue'
import SizesExampleRaw from './examples/sizes.vue?raw'
import StatesExample from './examples/states.vue'
import StatesExampleRaw from './examples/states.vue?raw'
import TriggersExample from './examples/triggers.vue'
import TriggersExampleRaw from './examples/triggers.vue?raw'

const meta: Meta = {
  title: 'Components/NumberInput',
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

export const Triggers = {
  parameters: {
    docs: {
      source: {
        code: TriggersExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: TriggersExample },
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

export const Format = {
  parameters: {
    docs: {
      source: {
        code: FormatExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: FormatExample },
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

export const Programmatic = {
  parameters: {
    docs: {
      source: {
        code: ProgrammaticExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: ProgrammaticExample },
    template: '<Component />',
  }),
}
