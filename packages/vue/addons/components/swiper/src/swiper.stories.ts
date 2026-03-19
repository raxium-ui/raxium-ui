import type { Meta } from 'storybook-vue3-rsbuild'

import AutoplayExample from './examples/autoplay.vue'
import AutoplayExampleRaw from './examples/autoplay.vue?raw'
import BasicExample from './examples/basic.vue'
import BasicExampleRaw from './examples/basic.vue?raw'
import LoopExample from './examples/loop.vue'
import LoopExampleRaw from './examples/loop.vue?raw'
import MultipleSlidesExample from './examples/multiple-slides.vue'
import MultipleSlidesExampleRaw from './examples/multiple-slides.vue?raw'
import VerticalExample from './examples/vertical.vue'
import VerticalExampleRaw from './examples/vertical.vue?raw'
import WithNavigationExample from './examples/with-navigation.vue'
import WithNavigationExampleRaw from './examples/with-navigation.vue?raw'
import WithPaginationExample from './examples/with-pagination.vue'
import WithPaginationExampleRaw from './examples/with-pagination.vue?raw'
import WithPrevNextExample from './examples/with-prev-next.vue'
import WithPrevNextExampleRaw from './examples/with-prev-next.vue?raw'
import WithScrollbarExample from './examples/with-scrollbar.vue'
import WithScrollbarExampleRaw from './examples/with-scrollbar.vue?raw'

import './index.css'

const meta: Meta = {
  title: 'Addons/Components/Swiper',
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

export const WithPagination = {
  parameters: {
    docs: {
      source: {
        code: WithPaginationExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: WithPaginationExample },
    template: '<Component />',
  }),
}

export const WithNavigation = {
  parameters: {
    docs: {
      source: {
        code: WithNavigationExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: WithNavigationExample },
    template: '<Component />',
  }),
}

export const WithScrollbar = {
  parameters: {
    docs: {
      source: {
        code: WithScrollbarExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: WithScrollbarExample },
    template: '<Component />',
  }),
}

export const WithPrevNext = {
  parameters: {
    docs: {
      source: {
        code: WithPrevNextExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: WithPrevNextExample },
    template: '<Component />',
  }),
}

export const Autoplay = {
  parameters: {
    docs: {
      source: {
        code: AutoplayExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: AutoplayExample },
    template: '<Component />',
  }),
}

export const Vertical = {
  parameters: {
    docs: {
      source: {
        code: VerticalExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: VerticalExample },
    template: '<Component />',
  }),
}

export const Loop = {
  parameters: {
    docs: {
      source: {
        code: LoopExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: LoopExample },
    template: '<Component />',
  }),
}

export const MultipleSlides = {
  parameters: {
    docs: {
      source: {
        code: MultipleSlidesExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: MultipleSlidesExample },
    template: '<Component />',
  }),
}
