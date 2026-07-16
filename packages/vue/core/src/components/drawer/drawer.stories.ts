import type { Meta } from 'storybook-vue3-rsbuild'

import BasicExample from './examples/basic.vue'
import BasicExampleRaw from './examples/basic.vue?raw'
import ControlledAndBeforeCloseExample from './examples/controlled-and-before-close.vue'
import ControlledAndBeforeCloseExampleRaw from './examples/controlled-and-before-close.vue?raw'
import GrabberExample from './examples/grabber.vue'
import GrabberExampleRaw from './examples/grabber.vue?raw'
import NestedWithDialogExample from './examples/nested-with-dialog.vue'
import NestedWithDialogExampleRaw from './examples/nested-with-dialog.vue?raw'
import SidesExample from './examples/sides.vue'
import SidesExampleRaw from './examples/sides.vue?raw'
import WithFormExample from './examples/with-form.vue'
import WithFormExampleRaw from './examples/with-form.vue?raw'

const meta: Meta = {
  title: 'Components/Drawer',
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

export const Sides = {
  parameters: {
    docs: {
      source: {
        code: SidesExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: SidesExample },
    template: '<Component />',
  }),
}

export const WithForm = {
  parameters: {
    docs: {
      source: {
        code: WithFormExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: WithFormExample },
    template: '<Component />',
  }),
}

export const Grabber = {
  parameters: {
    docs: {
      source: {
        code: GrabberExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: GrabberExample },
    template: '<Component />',
  }),
}

export const NestedWithDialog = {
  parameters: {
    docs: {
      source: {
        code: NestedWithDialogExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: NestedWithDialogExample },
    template: '<Component />',
  }),
}

export const ControlledAndBeforeClose = {
  parameters: {
    docs: {
      source: {
        code: ControlledAndBeforeCloseExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: ControlledAndBeforeCloseExample },
    template: '<Component />',
  }),
}
