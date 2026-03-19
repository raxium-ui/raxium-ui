import type { Meta } from 'storybook-vue3-rsbuild'

import BasicExample from './examples/basic.vue'
import BasicExampleRaw from './examples/basic.vue?raw'
import CheckboxExample from './examples/checkbox.vue'
import CheckboxExampleRaw from './examples/checkbox.vue?raw'
import ContextTriggerExample from './examples/context-trigger.vue'
import ContextTriggerExampleRaw from './examples/context-trigger.vue?raw'
import ControlledOpenExample from './examples/controlled-open.vue'
import ControlledOpenExampleRaw from './examples/controlled-open.vue?raw'
import RadioExample from './examples/radio.vue'
import RadioExampleRaw from './examples/radio.vue?raw'
import SizesExample from './examples/sizes.vue'
import SizesExampleRaw from './examples/sizes.vue?raw'
import SubmenuExample from './examples/submenu.vue'
import SubmenuExampleRaw from './examples/submenu.vue?raw'

const meta: Meta = {
  title: 'Components/Menu',
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

export const Submenu = {
  parameters: {
    docs: {
      source: {
        code: SubmenuExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: SubmenuExample },
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

export const Radio = {
  parameters: {
    docs: {
      source: {
        code: RadioExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: RadioExample },
    template: '<Component />',
  }),
}

export const ContextTrigger = {
  parameters: {
    docs: {
      source: {
        code: ContextTriggerExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: ContextTriggerExample },
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
