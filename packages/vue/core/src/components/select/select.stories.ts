import type { Meta } from 'storybook-vue3-rsbuild'

import BasicExample from './examples/basic.vue'
import BasicExampleRaw from './examples/basic.vue?raw'
import ControlledOpenAndHighlightExample from './examples/controlled-open-and-highlight.vue'
import ControlledOpenAndHighlightExampleRaw from './examples/controlled-open-and-highlight.vue?raw'
import GroupsAndDisabledExample from './examples/groups-and-disabled.vue'
import GroupsAndDisabledExampleRaw from './examples/groups-and-disabled.vue?raw'
import MultipleAndClearableExample from './examples/multiple-and-clearable.vue'
import MultipleAndClearableExampleRaw from './examples/multiple-and-clearable.vue?raw'
import SizesExample from './examples/sizes.vue'
import SizesExampleRaw from './examples/sizes.vue?raw'

const meta: Meta = {
  title: 'Components/Select',
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

export const GroupsAndDisabled = {
  parameters: {
    docs: {
      source: {
        code: GroupsAndDisabledExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: GroupsAndDisabledExample },
    template: '<Component />',
  }),
}

export const MultipleAndClearable = {
  parameters: {
    docs: {
      source: {
        code: MultipleAndClearableExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: MultipleAndClearableExample },
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

export const ControlledOpenAndHighlight = {
  parameters: {
    docs: {
      source: {
        code: ControlledOpenAndHighlightExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: ControlledOpenAndHighlightExample },
    template: '<Component />',
  }),
}

