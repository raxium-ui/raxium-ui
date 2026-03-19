import type { Meta } from 'storybook-vue3-rsbuild'

import { h } from 'vue'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  ReadMore as ReadMoreComponent,
} from '.'
import BasicExample from './examples/basic.vue'
import BasicExampleRaw from './examples/basic.vue?raw'
import ReadMoreExample from './examples/read-more.vue'
import ReadMoreExampleRaw from './examples/read-more.vue?raw'
import SizesExample from './examples/sizes.vue'
import SizesExampleRaw from './examples/sizes.vue?raw'
import StatesExample from './examples/states.vue'
import StatesExampleRaw from './examples/states.vue?raw'
import TriggerAndSlotsExample from './examples/trigger-and-slots.vue'
import TriggerAndSlotsExampleRaw from './examples/trigger-and-slots.vue?raw'

const meta: Meta = {
  title: 'Components/Collapsible',
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
    template: '<Component id="collapsible-basic" />',
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
    template: '<Component id="collapsible-states" />',
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
    template: '<Component id="collapsible-sizes" />',
  }),
}

export const TriggerAndSlots = {
  parameters: {
    docs: {
      source: {
        code: TriggerAndSlotsExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: TriggerAndSlotsExample },
    template: '<Component id="collapsible-trigger-and-slots" />',
  }),
}

export const ReadMore = {
  parameters: {
    docs: {
      source: {
        code: ReadMoreExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: ReadMoreExample },
    template: '<Component id="collapsible-read-more" />',
  }),
}

export const ThemeExample = {
  parameters: {
    docs: {
      source: {
        code: `<Collapsible :theme="{ size: 'sm' }">
  <CollapsibleTrigger>Small</CollapsibleTrigger>
  <CollapsibleContent>Small content</CollapsibleContent>
</Collapsible>
<Collapsible :theme="{ size: 'lg' }">
  <CollapsibleTrigger>Large</CollapsibleTrigger>
  <CollapsibleContent>Large content</CollapsibleContent>
</Collapsible>`,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Collapsible, CollapsibleTrigger, CollapsibleContent },
    setup() {
      return () =>
        h('div', { class: 'w-full flex flex-col gap-4' }, [
          h(
            Collapsible,
            { id: 'theme-example-small', class: 'w-full', theme: { size: 'sm' } },
            () => [
              h(CollapsibleTrigger, () =>
                h('span', { class: 'text-blue-500' }, 'Small size trigger')),
              h(CollapsibleContent, { class: 'mt-2' }, () =>
                h('p', { class: 'text-sm text-slate-400' }, 'Small size content')),
            ],
          ),
          h(
            Collapsible,
            { id: 'theme-example-large', class: 'w-full', theme: { size: 'lg' } },
            () => [
              h(CollapsibleTrigger, () =>
                h('span', { class: 'text-blue-500' }, 'Large size trigger')),
              h(CollapsibleContent, { class: 'mt-2' }, () =>
                h('p', { class: 'text-sm text-slate-400' }, 'Large size content')),
            ],
          ),
        ])
    },
  }),
}

export const UIExample = {
  parameters: {
    docs: {
      source: {
        code: `<Collapsible>
  <CollapsibleTrigger :ui="{ root: 'text-blue-500', indicator: 'text-blue-500' }">
    Trigger with custom indicator style
  </CollapsibleTrigger>
  <CollapsibleContent>Content</CollapsibleContent>
</Collapsible>
<ReadMore
  :collapsed-height="60"
  :ui="{ root: 'border border-slate-300 p-3 rounded-md', trigger: 'text-blue-500', content: 'text-slate-400' }"
>
  Long content...
</ReadMore>`,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: {
      Collapsible,
      CollapsibleTrigger,
      CollapsibleContent,
      ReadMore: ReadMoreComponent,
    },
    setup() {
      const longText = 'This is a long content for ReadMore UI customization demo. '.repeat(10)
      return () =>
        h('div', { class: 'w-full flex flex-col gap-4' }, [
          h(Collapsible, { id: 'ui-example-collapsible', class: 'w-full' }, () => [
            h(
              CollapsibleTrigger,
              { ui: { root: 'text-blue-500', indicator: 'text-blue-500' } },
              () => h('span', 'Trigger with custom indicator style'),
            ),
            h(CollapsibleContent, { class: 'mt-2' }, () =>
              h('p', { class: 'text-sm text-slate-400' }, 'Collapsible content')),
          ]),
          h(
            ReadMoreComponent,
            {
              collapsedHeight: 60,
              id: 'ui-example-read-more',
              ui: {
                root: 'border border-slate-300 p-3 rounded-md',
                trigger: 'text-blue-500',
                content: 'text-slate-400',
              },
            },
            () => h('p', { class: 'text-sm' }, longText),
          ),
        ])
    },
  }),
}
