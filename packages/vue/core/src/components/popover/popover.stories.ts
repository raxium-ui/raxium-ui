import type { Meta } from 'storybook-vue3-rsbuild'

import BasicExample from './examples/basic.vue'
import BasicExampleRaw from './examples/basic.vue?raw'
import ContextAndInteractiveExample from './examples/context-and-interactive.vue'
import ContextAndInteractiveExampleRaw from './examples/context-and-interactive.vue?raw'
import ControlledOpenExample from './examples/controlled-open.vue'
import ControlledOpenExampleRaw from './examples/controlled-open.vue?raw'
import PositioningExample from './examples/positioning.vue'
import PositioningExampleRaw from './examples/positioning.vue?raw'
import SkinsAndVariantsExample from './examples/skins-and-variants.vue'
import SkinsAndVariantsExampleRaw from './examples/skins-and-variants.vue?raw'

const meta: Meta = {
  title: 'Components/Popover',
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

export const SkinsAndVariants = {
  parameters: {
    docs: {
      source: {
        code: SkinsAndVariantsExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: SkinsAndVariantsExample },
    template: '<Component />',
  }),
}

export const Positioning = {
  parameters: {
    docs: {
      source: {
        code: PositioningExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: PositioningExample },
    template: '<Component />',
  }),
}

export const ContextAndInteractive = {
  parameters: {
    docs: {
      source: {
        code: ContextAndInteractiveExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: ContextAndInteractiveExample },
    template: '<Component />',
  }),
}

export const ControlledOpen = {
  parameters: {
    docs: {
      source: {
        code: ControlledOpenExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: ControlledOpenExample },
    template: '<Component />',
  }),
}

