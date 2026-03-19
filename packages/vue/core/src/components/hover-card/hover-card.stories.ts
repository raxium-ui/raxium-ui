import type { Meta } from 'storybook-vue3-rsbuild'

import BasicExample from './examples/basic.vue'
import BasicExampleRaw from './examples/basic.vue?raw'
import ControlledAndContextExample from './examples/controlled-and-context.vue'
import ControlledAndContextExampleRaw from './examples/controlled-and-context.vue?raw'
import CustomContentExample from './examples/custom-content.vue'
import CustomContentExampleRaw from './examples/custom-content.vue?raw'
import DelaysAndPositioningExample from './examples/delays-and-positioning.vue'
import DelaysAndPositioningExampleRaw from './examples/delays-and-positioning.vue?raw'
import ThemesAndVariantsExample from './examples/themes-and-variants.vue'
import ThemesAndVariantsExampleRaw from './examples/themes-and-variants.vue?raw'

const meta: Meta = {
  title: 'Components/HoverCard',
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

export const DelaysAndPositioning = {
  parameters: {
    docs: {
      source: {
        code: DelaysAndPositioningExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: DelaysAndPositioningExample },
    template: '<Component />',
  }),
}

export const ControlledAndContext = {
  parameters: {
    docs: {
      source: {
        code: ControlledAndContextExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: ControlledAndContextExample },
    template: '<Component />',
  }),
}

export const ThemesAndVariants = {
  parameters: {
    docs: {
      source: {
        code: ThemesAndVariantsExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: ThemesAndVariantsExample },
    template: '<Component />',
  }),
}

export const CustomContent = {
  parameters: {
    docs: {
      source: {
        code: CustomContentExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: CustomContentExample },
    template: '<Component />',
  }),
}

