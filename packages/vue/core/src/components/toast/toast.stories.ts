import type { Meta } from 'storybook-vue3-rsbuild'

import BasicExample from './examples/basic.vue'
import BasicExampleRaw from './examples/basic.vue?raw'
import CustomRenderExample from './examples/custom-render.vue'
import CustomRenderExampleRaw from './examples/custom-render.vue?raw'
import DurationAndActionsExample from './examples/duration-and-actions.vue'
import DurationAndActionsExampleRaw from './examples/duration-and-actions.vue?raw'
import PlacementsExample from './examples/placements.vue'
import PlacementsExampleRaw from './examples/placements.vue?raw'
import PromiseExample from './examples/promise.vue'
import PromiseExampleRaw from './examples/promise.vue?raw'
import SlotsAndUiExample from './examples/slots-and-ui.vue'
import SlotsAndUiExampleRaw from './examples/slots-and-ui.vue?raw'

const meta: Meta = {
  title: 'Components/Toast',
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

export const Placements = {
  parameters: {
    docs: {
      source: {
        code: PlacementsExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: PlacementsExample },
    template: '<Component />',
  }),
}

export const Promise = {
  parameters: {
    docs: {
      source: {
        code: PromiseExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: PromiseExample },
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

export const DurationAndActions = {
  parameters: {
    docs: {
      source: {
        code: DurationAndActionsExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: DurationAndActionsExample },
    template: '<Component />',
  }),
}

export const SlotsAndUi = {
  parameters: {
    docs: {
      source: {
        code: SlotsAndUiExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: SlotsAndUiExample },
    template: '<Component />',
  }),
}
