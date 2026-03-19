import type { Meta } from 'storybook-vue3-rsbuild'

import BasicExample from './examples/basic.vue'
import BasicExampleRaw from './examples/basic.vue?raw'
import CheckboxExample from './examples/checkbox.vue'
import CheckboxExampleRaw from './examples/checkbox.vue?raw'
import CustomDatatypeExample from './examples/custom-datatype.vue'
import CustomDatatypeExampleRaw from './examples/custom-datatype.vue?raw'
import DisabledNodesExample from './examples/disabled-nodes.vue'
import DisabledNodesExampleRaw from './examples/disabled-nodes.vue?raw'
import CustomPropsRenderExample from './examples/custom-props-render.vue'
import CustomPropsRenderExampleRaw from './examples/custom-props-render.vue?raw'
import CustomRenderExample from './examples/custom-render.vue'
import CustomRenderExampleRaw from './examples/custom-render.vue?raw'
import EventsExample from './examples/events.vue'
import EventsExampleRaw from './examples/events.vue?raw'
import LargeDataExample from './examples/large-data.vue'
import LargeDataExampleRaw from './examples/large-data.vue?raw'
import SelectionModesExample from './examples/selection-modes.vue'
import SelectionModesExampleRaw from './examples/selection-modes.vue?raw'
import SizesExample from './examples/sizes.vue'
import SizesExampleRaw from './examples/sizes.vue?raw'

const meta: Meta = {
  title: 'Components/Tree',
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

export const LargeData = {
  parameters: {
    docs: {
      source: {
        code: LargeDataExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: LargeDataExample },
    template: '<Component />',
  }),
}

export const SelectionModes = {
  parameters: {
    docs: {
      source: {
        code: SelectionModesExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: SelectionModesExample },
    template: '<Component />',
  }),
}

export const DisabledNodes = {
  parameters: {
    docs: {
      source: {
        code: DisabledNodesExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: DisabledNodesExample },
    template: '<Component />',
  }),
}

export const Checkbox = {
  parameters: {
    docs: {
      source: {
        code: CheckboxExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: CheckboxExample },
    template: '<Component />',
  }),
}

export const CustomDatatype = {
  parameters: {
    docs: {
      source: {
        code: CustomDatatypeExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: CustomDatatypeExample },
    template: '<Component />',
  }),
}

export const CustomRender = {
  parameters: {
    docs: {
      source: {
        code: CustomRenderExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: CustomRenderExample },
    template: '<Component />',
  }),
}

export const CustomPropsRender = {
  parameters: {
    docs: {
      source: {
        code: CustomPropsRenderExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: CustomPropsRenderExample },
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
