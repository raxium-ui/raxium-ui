import type { Meta } from 'storybook-vue3-rsbuild'

import { h } from 'vue'
import BasicExample from './examples/basic.vue'
import BasicExampleRaw from './examples/basic.vue?raw'
import DotExample from './examples/dot.vue'
import DotExampleRaw from './examples/dot.vue?raw'
import SecondaryExample from './examples/secondary.vue'
import SecondaryExampleRaw from './examples/secondary.vue?raw'
import { Badge } from './index'

const meta: Meta = {
  title: 'Components/Badge',
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

export const Secondary = {
  parameters: {
    docs: {
      source: {
        code: SecondaryExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: SecondaryExample },
    template: '<Component />',
  }),
}

export const Dot = {
  parameters: {
    docs: {
      source: {
        code: DotExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: DotExample },
    template: '<Component />',
  }),
}

export const ThemeExample = {
  parameters: {
    docs: {
      source: {
        code: '<Badge :theme="{ size: \'sm\' }">Small</Badge>\n<Badge :theme="{ size: \'lg\', skin: \'razer\' }">Large</Badge>',
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Badge },
    setup() {
      return () => [
        h('div', { class: 'flex items-center gap-4' }, [
          h(Badge, { theme: { size: 'sm' } }, 'Small'),
          h(Badge, { theme: { size: 'lg', skin: 'razer' } }, 'Large'),
        ]),
      ]
    },
  }),
}
