import type { Meta } from 'storybook-vue3-rsbuild'

import { h } from 'vue'
import { Checkbox } from '.'
import BasicExample from './examples/basic.vue'
import BasicExampleRaw from './examples/basic.vue?raw'
import GroupExample from './examples/group.vue'
import GroupExampleRaw from './examples/group.vue?raw'
import SizesExample from './examples/sizes.vue'
import SizesExampleRaw from './examples/sizes.vue?raw'
import SlotsAndUiExample from './examples/slots-and-ui.vue'
import SlotsAndUiExampleRaw from './examples/slots-and-ui.vue?raw'
import StatesExample from './examples/states.vue'
import StatesExampleRaw from './examples/states.vue?raw'

const meta: Meta = {
  title: 'Components/Checkbox',
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

export const States = {
  parameters: {
    docs: {
      source: {
        code: StatesExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: StatesExample },
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

export const Group = {
  parameters: {
    docs: {
      source: {
        code: GroupExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: GroupExample },
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

export const ThemeExample = {
  parameters: {
    docs: {
      source: {
        code: `<Checkbox label="Small" :theme="{ size: 'sm' }" />
<Checkbox label="Large" :theme="{ size: 'lg', skin: 'razer' }" :default-checked="true" />`,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Checkbox },
    setup() {
      return () =>
        h('div', { class: 'w-full flex items-center gap-6' }, [
          h(Checkbox, { id: 'theme-example-small', label: 'Small', theme: { size: 'sm' } }),
          h(Checkbox, {
            id: 'theme-example-large',
            label: 'Large',
            theme: { size: 'lg', skin: 'razer' },
            defaultChecked: true,
          }),
        ])
    },
  }),
}

export const UIExample = {
  parameters: {
    docs: {
      source: {
        code: `<Checkbox
  label="Custom Control"
  :ui="{ root: 'gap-3', control: 'border-rz-green data-[state=checked]:bg-rz-green', label: 'text-rz-green font-medium' }"
/>
<Checkbox
  :default-checked="true"
  :ui="{ indicator: 'text-rz-green', control: 'border-rz-green data-[state=checked]:bg-black' }"
>
  <template #label>Custom Indicator</template>
</Checkbox>`,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Checkbox },
    setup() {
      return () =>
        h('div', { class: 'w-full flex items-center gap-6' }, [
          h(Checkbox, {
            label: 'Custom Control',
            id: 'ui-example-custom-control',
            ui: {
              root: 'gap-3',
              control: 'border-white data-[state=checked]:bg-white',
              label: 'text-yellow-500 font-medium',
            },
          }),
          h(
            Checkbox,
            {
              defaultChecked: true,
              id: 'ui-example-custom-indicator',
              ui: {
                indicator: '[&>svg]:stroke-blue-500',
                control: 'border-white data-[state=checked]:bg-white',
              },
            },
            {
              label: () => h('span', 'Custom Indicator'),
            },
          ),
        ])
    },
  }),
}
