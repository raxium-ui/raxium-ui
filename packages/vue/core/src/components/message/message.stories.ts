import type { Meta } from 'storybook-vue3-rsbuild'

import BasicExample from './examples/basic.vue'
import BasicExampleRaw from './examples/basic.vue?raw'
import CustomRenderExample from './examples/custom-render.vue'
import CustomRenderExampleRaw from './examples/custom-render.vue?raw'
import MessagerPropsExample from './examples/messager-props.vue'
import MessagerPropsExampleRaw from './examples/messager-props.vue?raw'
import PromiseExample from './examples/promise.vue'
import PromiseExampleRaw from './examples/promise.vue?raw'
import SizesAndCloseExample from './examples/sizes-and-close.vue'
import SizesAndCloseExampleRaw from './examples/sizes-and-close.vue?raw'

const meta: Meta = {
  title: 'Components/Message',
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

export const SizesAndClose = {
  parameters: {
    docs: {
      source: {
        code: SizesAndCloseExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: SizesAndCloseExample },
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

export const MessagerProps = {
  parameters: {
    docs: {
      source: {
        code: MessagerPropsExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: MessagerPropsExample },
    template: '<Component />',
  }),
}

