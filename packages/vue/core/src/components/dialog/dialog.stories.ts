import type { Meta } from 'storybook-vue3-rsbuild'

import BasicExample from './examples/basic.vue'
import BasicExampleRaw from './examples/basic.vue?raw'
import ContentCloseExample from './examples/content-close.vue'
import ContentCloseExampleRaw from './examples/content-close.vue?raw'
import ControlledAndEventsExample from './examples/controlled-and-events.vue'
import ControlledAndEventsExampleRaw from './examples/controlled-and-events.vue?raw'
import FooterWidgetExample from './examples/footer-widget.vue'
import FooterWidgetExampleRaw from './examples/footer-widget.vue?raw'
import FunctionalExample from './examples/functional.vue'
import FunctionalExampleRaw from './examples/functional.vue?raw'
import ScrollableExample from './examples/scrollable.vue'
import ScrollableExampleRaw from './examples/scrollable.vue?raw'
import VariantsExample from './examples/variants.vue'
import VariantsExampleRaw from './examples/variants.vue?raw'

const meta: Meta = {
  title: 'Components/Dialog',
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

export const ControlledAndEvents = {
  parameters: {
    docs: {
      source: {
        code: ControlledAndEventsExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: ControlledAndEventsExample },
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

export const Scrollable = {
  parameters: {
    docs: {
      source: {
        code: ScrollableExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: ScrollableExample },
    template: '<Component />',
  }),
}

export const ContentClose = {
  parameters: {
    docs: {
      source: {
        code: ContentCloseExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: ContentCloseExample },
    template: '<Component />',
  }),
}

export const FooterWidget = {
  parameters: {
    docs: {
      source: {
        code: FooterWidgetExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: FooterWidgetExample },
    template: '<Component />',
  }),
}

export const Functional = {
  parameters: {
    docs: {
      source: {
        code: FunctionalExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: FunctionalExample },
    template: '<Component />',
  }),
}
