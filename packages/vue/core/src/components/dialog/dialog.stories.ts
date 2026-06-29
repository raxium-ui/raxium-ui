import type { Meta } from 'storybook-vue3-rsbuild'

import BasicExample from './examples/basic.vue'
import BasicExampleRaw from './examples/basic.vue?raw'
import BeforeCloseExample from './examples/before-close.vue'
import BeforeCloseExampleRaw from './examples/before-close.vue?raw'
import ContentCloseExample from './examples/content-close.vue'
import ContentCloseExampleRaw from './examples/content-close.vue?raw'
import ControlledAndEventsExample from './examples/controlled-and-events.vue'
import ControlledAndEventsExampleRaw from './examples/controlled-and-events.vue?raw'
import DetachedDomLeakWorkaroundExample from './examples/detached-dom-leak-workaround.vue'
import DetachedDomLeakWorkaroundExampleRaw from './examples/detached-dom-leak-workaround.vue?raw'
import DetachedDomLeakExample from './examples/detached-dom-leak.vue'
import DetachedDomLeakExampleRaw from './examples/detached-dom-leak.vue?raw'
import FooterWidgetExample from './examples/footer-widget.vue'
import FooterWidgetExampleRaw from './examples/footer-widget.vue?raw'
import FunctionalExample from './examples/functional.vue'
import FunctionalExampleRaw from './examples/functional.vue?raw'
import ScrollableExample from './examples/scrollable.vue'
import ScrollableExampleRaw from './examples/scrollable.vue?raw'
import StackedFunctionalExample from './examples/stacked-functional.vue'
import StackedFunctionalExampleRaw from './examples/stacked-functional.vue?raw'
import StackedExample from './examples/stacked.vue'
import StackedExampleRaw from './examples/stacked.vue?raw'
import TooltipSurfaceExample from './examples/tooltip-surface.vue'
import TooltipSurfaceExampleRaw from './examples/tooltip-surface.vue?raw'
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

export const BeforeClose = {
  parameters: {
    docs: {
      source: {
        code: BeforeCloseExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: BeforeCloseExample },
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

export const Stacked = {
  parameters: {
    docs: {
      source: {
        code: StackedExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: StackedExample },
    template: '<Component />',
  }),
}

export const StackedFunctional = {
  parameters: {
    docs: {
      source: {
        code: StackedFunctionalExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: StackedFunctionalExample },
    template: '<Component />',
  }),
}

export const TooltipSurface = {
  parameters: {
    docs: {
      source: {
        code: TooltipSurfaceExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: TooltipSurfaceExample },
    template: '<Component />',
  }),
}

export const DetachedDomLeak = {
  parameters: {
    docs: {
      source: {
        code: DetachedDomLeakExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: DetachedDomLeakExample },
    template: '<Component />',
  }),
}

export const DetachedDomLeakWorkaround = {
  parameters: {
    docs: {
      source: {
        code: DetachedDomLeakWorkaroundExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: DetachedDomLeakWorkaroundExample },
    template: '<Component />',
  }),
}
