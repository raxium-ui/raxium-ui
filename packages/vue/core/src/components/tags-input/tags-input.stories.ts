import type { Meta } from 'storybook-vue3-rsbuild'

import BasicExample from './examples/basic.vue'
import BasicExampleRaw from './examples/basic.vue?raw'
import EventsExample from './examples/events.vue'
import EventsExampleRaw from './examples/events.vue?raw'
import InlineExample from './examples/inline.vue'
import InlineExampleRaw from './examples/inline.vue?raw'
import MaxAndValidateExample from './examples/max-and-validate.vue'
import MaxAndValidateExampleRaw from './examples/max-and-validate.vue?raw'
import ProgrammaticExample from './examples/programmatic.vue'
import ProgrammaticExampleRaw from './examples/programmatic.vue?raw'
import SizesExample from './examples/sizes.vue'
import SizesExampleRaw from './examples/sizes.vue?raw'
import StatesExample from './examples/states.vue'
import StatesExampleRaw from './examples/states.vue?raw'

const meta: Meta = {
  title: 'Components/TagsInput',
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

export const Inline = {
  parameters: {
    docs: {
      source: {
        code: InlineExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: InlineExample },
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

export const MaxAndValidate = {
  parameters: {
    docs: {
      source: {
        code: MaxAndValidateExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: MaxAndValidateExample },
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

