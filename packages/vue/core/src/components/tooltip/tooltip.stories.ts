import type { Meta } from 'storybook-vue3-rsbuild'

import BasicExample from './examples/basic.vue'
import BasicExampleRaw from './examples/basic.vue?raw'
import DelaysAndControlledOpenExample from './examples/delays-and-controlled-open.vue'
import DelaysAndControlledOpenExampleRaw from './examples/delays-and-controlled-open.vue?raw'
import DisabledExample from './examples/disabled.vue'
import DisabledExampleRaw from './examples/disabled.vue?raw'
import PlacementsAndSkinsExample from './examples/placements-and-skins.vue'
import PlacementsAndSkinsExampleRaw from './examples/placements-and-skins.vue?raw'
import SizesAndBorderedExample from './examples/sizes-and-bordered.vue'
import SizesAndBorderedExampleRaw from './examples/sizes-and-bordered.vue?raw'
import UiAndFixedStrategyExample from './examples/ui-and-fixed-strategy.vue'
import UiAndFixedStrategyExampleRaw from './examples/ui-and-fixed-strategy.vue?raw'

const meta: Meta = {
  title: 'Components/Tooltip',
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

export const PlacementsAndSkins = {
  parameters: {
    docs: {
      source: {
        code: PlacementsAndSkinsExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: PlacementsAndSkinsExample },
    template: '<Component />',
  }),
}

export const SizesAndBordered = {
  parameters: {
    docs: {
      source: {
        code: SizesAndBorderedExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: SizesAndBorderedExample },
    template: '<Component />',
  }),
}

export const DelaysAndControlledOpen = {
  parameters: {
    docs: {
      source: {
        code: DelaysAndControlledOpenExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: DelaysAndControlledOpenExample },
    template: '<Component />',
  }),
}

export const Disabled = {
  parameters: {
    docs: {
      source: {
        code: DisabledExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: DisabledExample },
    template: '<Component />',
  }),
}

export const UiAndFixedStrategy = {
  parameters: {
    docs: {
      source: {
        code: UiAndFixedStrategyExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: UiAndFixedStrategyExample },
    template: '<Component />',
  }),
}

