import type { Meta } from 'storybook-vue3-rsbuild'

import BasicExample from './examples/basic.vue'
import BasicExampleRaw from './examples/basic.vue?raw'
import ControlledExample from './examples/controlled.vue'
import ControlledExampleRaw from './examples/controlled.vue?raw'
import MarkersAndTooltipsExample from './examples/markers-and-tooltips.vue'
import MarkersAndTooltipsExampleRaw from './examples/markers-and-tooltips.vue?raw'
import RangeExample from './examples/range.vue'
import RangeExampleRaw from './examples/range.vue?raw'
import SizesExample from './examples/sizes.vue'
import SizesExampleRaw from './examples/sizes.vue?raw'
import VerticalAndDisabledExample from './examples/vertical-and-disabled.vue'
import VerticalAndDisabledExampleRaw from './examples/vertical-and-disabled.vue?raw'

const meta: Meta = {
  title: 'Components/Slider',
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

export const Range = {
  parameters: {
    docs: {
      source: {
        code: RangeExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: RangeExample },
    template: '<Component />',
  }),
}

export const MarkersAndTooltips = {
  parameters: {
    docs: {
      source: {
        code: MarkersAndTooltipsExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: MarkersAndTooltipsExample },
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

export const VerticalAndDisabled = {
  parameters: {
    docs: {
      source: {
        code: VerticalAndDisabledExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: VerticalAndDisabledExample },
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

