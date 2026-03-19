import type { Meta } from 'storybook-vue3-rsbuild'

import { h } from 'vue'
import { Button } from '.'
import BasicExample from './examples/basic.vue'
import BasicExampleRaw from './examples/basic.vue?raw'
import CraftsExample from './examples/crafts.vue'
import CraftsExampleRaw from './examples/crafts.vue?raw'
import SizesExample from './examples/sizes.vue'
import SizesExampleRaw from './examples/sizes.vue?raw'
import VariantsExample from './examples/variants.vue'
import VariantsExampleRaw from './examples/variants.vue?raw'

const meta: Meta = {
  title: 'Components/Button',
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

export const Variants = {
  parameters: {
    docs: {
      source: {
        code: VariantsExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: VariantsExample },
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

export const Crafts = {
  parameters: {
    docs: {
      source: {
        code: CraftsExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: CraftsExample },
    template: '<Component />',
  }),
}

export const ThemeExample = {
  parameters: {
    docs: {
      source: {
        code: '<Button :theme="{ size: \'sm\' }">Small</Button>\n<Button :theme="{ size: \'lg\', skin: \'razer\' }">Large</Button>',
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Button },
    setup() {
      return () =>
        h('div', { class: 'flex items-center gap-4' }, [
          h(Button, { theme: { size: 'sm' } }, 'Small'),
          h(Button, { theme: { size: 'lg', skin: 'razer' } }, 'Large'),
        ])
    },
  }),
}

export const UIExample = {
  parameters: {
    docs: {
      source: {
        code: `<Button :ui="{ root: { class: 'custom-btn' } }">Custom</Button>
<Button loading :ui="{ loading: { class: 'text-blue-500' } }">Loading</Button>`,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Button },
    setup() {
      return () =>
        h('div', { class: 'flex items-center gap-4' }, [
          h(Button, { ui: { root: { class: 'bg-red-500' } } }, 'Custom'),
          h(Button, { loading: true, ui: { loading: { class: 'text-blue-500' } } }, 'Loading'),
        ])
    },
  }),
}
