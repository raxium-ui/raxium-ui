import type { Meta } from 'storybook-vue3-rsbuild'

import type { Component, VNode } from 'vue'
import { h } from 'vue'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '.'
import BasicExample from './examples/basic.vue'
import BasicExampleRaw from './examples/basic.vue?raw'
import SizesExample from './examples/sizes.vue'
import SizesExampleRaw from './examples/sizes.vue?raw'
import StatesExample from './examples/states.vue'
import StatesExampleRaw from './examples/states.vue?raw'
import TriggerAndSlotsExample from './examples/trigger-and-slots.vue'
import TriggerAndSlotsExampleRaw from './examples/trigger-and-slots.vue?raw'

/** 避免 h() 推断暴露 @zag-js/accordion 内部类型（TS4023） */
const AccordionRoot = Accordion as Component
const AccordionItemRoot = AccordionItem as Component
const AccordionTriggerRoot = AccordionTrigger as Component
const AccordionContentRoot = AccordionContent as Component

const meta: Meta = {
  title: 'Components/Accordion',
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
    template: '<Component id="accordion-basic-story" />',
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
    template: '<Component id="accordion-states-story" />',
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
    template: '<Component id="accordion-sizes-story" />',
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
    template: '<Component id="accordion-trigger-and-slots-story" />',
  }),
}

export const ThemeExample = {
  parameters: {
    docs: {
      source: {
        code: `<Accordion :theme="{ size: 'sm' }" collapsible>
  <AccordionItem value="sm">
    <AccordionTrigger><span class="text-rz-green">Small</span></AccordionTrigger>
    <AccordionContent><p class="text-sm text-hcc">Small content</p></AccordionContent>
  </AccordionItem>
</Accordion>
<Accordion :theme="{ size: 'lg' }">
  <AccordionItem value="lg">
    <AccordionTrigger><span class="text-rz-green">Large</span></AccordionTrigger>
    <AccordionContent><p class="text-sm text-hcc">Large content</p></AccordionContent>
  </AccordionItem>
</Accordion>`,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: {
      Accordion: AccordionRoot,
      AccordionItem: AccordionItemRoot,
      AccordionTrigger: AccordionTriggerRoot,
      AccordionContent: AccordionContentRoot,
    },
    setup(): () => VNode {
      return () =>
        h('div', { class: 'w-full flex flex-col gap-4' }, [
          h(
            AccordionRoot,
            {
              id: 'accordion-theme-sm',
              class: 'w-full flex flex-col gap-2',
              theme: { size: 'sm' },
              collapsible: true,
            },
            () => [
              h(AccordionItemRoot, { value: 'sm' }, () => [
                h(AccordionTriggerRoot, () =>
                  h('span', { class: 'text-rz-green' }, 'Small size trigger')),
                h(AccordionContentRoot, { class: 'mt-2' }, () =>
                  h('p', { class: 'text-sm text-hcc' }, 'Small size content')),
              ]),
            ],
          ),
          h(
            AccordionRoot,
            {
              id: 'accordion-theme-lg',
              class: 'w-full flex flex-col gap-2',
              theme: { size: 'lg' },
              collapsible: true,
            },
            () => [
              h(AccordionItemRoot, { value: 'lg' }, () => [
                h(AccordionTriggerRoot, () =>
                  h('span', { class: 'text-rz-green' }, 'Large size trigger')),
                h(AccordionContentRoot, { class: 'mt-2' }, () =>
                  h('p', { class: 'text-sm text-hcc' }, 'Large size content')),
              ]),
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
        code: `<Accordion collapsible>
  <AccordionItem value="ui">
    <AccordionTrigger :ui="{ root: 'text-rz-green', indicator: 'bg-rz-blue' }">
      Trigger with custom indicator style
    </AccordionTrigger>
    <AccordionContent><p class="text-sm text-hcc">Content</p></AccordionContent>
  </AccordionItem>
</Accordion>`,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: {
      Accordion: AccordionRoot,
      AccordionItem: AccordionItemRoot,
      AccordionTrigger: AccordionTriggerRoot,
      AccordionContent: AccordionContentRoot,
    },
    setup(): () => VNode {
      return () =>
        h(
          AccordionRoot,
          { id: 'accordion-ui-example', class: 'w-full flex flex-col gap-2', collapsible: true },
          () => [
            h(AccordionItemRoot, { value: 'ui' }, () => [
              h(
                AccordionTriggerRoot,
                { ui: { root: 'text-rz-green', indicator: 'bg-rz-blue' } },
                () => h('span', 'Trigger with custom indicator style'),
              ),
              h(AccordionContentRoot, { class: 'mt-2' }, () =>
                h('p', { class: 'text-sm text-hcc' }, 'Accordion content')),
            ]),
          ],
        )
    },
  }),
}
