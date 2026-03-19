import type { Meta } from 'storybook-vue3-rsbuild'

import { h } from 'vue'
import { Button } from '../button'
import BasicExample from './examples/basic.vue'
import BasicExampleRaw from './examples/basic.vue?raw'
import DisabledDateExample from './examples/disabled-date.vue'
import DisabledDateExampleRaw from './examples/disabled-date.vue?raw'
import EventsExample from './examples/events.vue'
import EventsExampleRaw from './examples/events.vue?raw'
import RangeExample from './examples/range.vue'
import RangeExampleRaw from './examples/range.vue?raw'
import SizesExample from './examples/sizes.vue'
import SizesExampleRaw from './examples/sizes.vue?raw'
import ViewsExample from './examples/views.vue'
import ViewsExampleRaw from './examples/views.vue?raw'
import {
  DatePicker,
  DatePickerContent,
  DatePickerControl,
  DatePickerDayView,
  DatePickerMonthView,
  DatePickerTrigger,
  DatePickerYearView,
} from './index'

const meta: Meta = {
  title: 'Components/DatePicker',
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
    template: '<Component id="date-picker-basic" />',
  }),
}

export const Views = {
  parameters: {
    docs: {
      source: {
        code: ViewsExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: ViewsExample },
    template: '<Component id="date-picker-views" />',
  }),
}

export const Range = {
  parameters: {
    docs: {
      source: {
        code: RangeExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: RangeExample },
    template: '<Component id="date-picker-range" />',
  }),
}

export const Events = {
  parameters: {
    docs: {
      source: {
        code: EventsExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: EventsExample },
    template: '<Component id="date-picker-events" />',
  }),
}

export const DisabledDate = {
  parameters: {
    docs: {
      source: {
        code: DisabledDateExampleRaw,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: { Component: DisabledDateExample },
    template: '<Component id="date-picker-disabled-date" />',
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

export const ThemeExample = {
  parameters: {
    docs: {
      source: {
        code: `<DatePicker :theme="{ size: 'xs' }">
  <DatePickerControl class="w-fit">
    <DatePickerTrigger><Button :theme="{ size: 'xs' }">xs</Button></DatePickerTrigger>
  </DatePickerControl>
  <DatePickerContent>
    <DatePickerDayView />
    <DatePickerMonthView />
    <DatePickerYearView />
  </DatePickerContent>
</DatePicker>`,
        language: 'html',
      },
    },
  },
  render: () => ({
    components: {
      Button,
      DatePicker,
      DatePickerContent,
      DatePickerControl,
      DatePickerDayView,
      DatePickerMonthView,
      DatePickerTrigger,
      DatePickerYearView,
    },
    setup() {
      const sizes = ['xs', 'sm', 'base', 'lg'] as const

      return () =>
        h(
          'div',
          { class: 'flex flex-wrap items-center gap-3' },
          sizes.map(size =>
            h(
              DatePicker,
              { key: size, theme: { size } },
              {
                default: () => [
                  h(
                    DatePickerControl,
                    { class: 'w-fit' },
                    {
                      default: () => [
                        h(
                          DatePickerTrigger,
                          null,
                          {
                            default: () => h(Button, { theme: { size } }, () => size),
                          },
                        ),
                      ],
                    },
                  ),
                  h(
                    DatePickerContent,
                    null,
                    {
                      default: () => [
                        h(DatePickerDayView),
                        h(DatePickerMonthView),
                        h(DatePickerYearView),
                      ],
                    },
                  ),
                ],
              },
            ),
          ),
        )
    },
  }),
}
