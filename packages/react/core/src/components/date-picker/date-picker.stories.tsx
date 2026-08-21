import type { Meta, StoryObj } from 'storybook-react-rsbuild'
import { Button } from '../button'
import { DatePicker } from '.'
import { DatePickerBasicExample } from './examples/basic'
import BasicExampleRaw from './examples/basic.tsx?raw'
import { DatePickerDisabledDateExample } from './examples/disabled-date'
import DisabledDateExampleRaw from './examples/disabled-date.tsx?raw'
import { DatePickerEventsExample } from './examples/events'
import EventsExampleRaw from './examples/events.tsx?raw'
import { DatePickerRangeExample } from './examples/range'
import RangeExampleRaw from './examples/range.tsx?raw'
import { DatePickerSizesExample } from './examples/sizes'
import SizesExampleRaw from './examples/sizes.tsx?raw'
import { DatePickerViewsExample } from './examples/views'
import ViewsExampleRaw from './examples/views.tsx?raw'

const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  parameters: {
    docs: {
      source: { code: BasicExampleRaw, language: 'tsx' },
    },
  },
  render: () => <DatePickerBasicExample />,
}

export const Views: Story = {
  parameters: {
    docs: {
      source: { code: ViewsExampleRaw, language: 'tsx' },
    },
  },
  render: () => <DatePickerViewsExample />,
}

export const Range: Story = {
  parameters: {
    docs: {
      source: { code: RangeExampleRaw, language: 'tsx' },
    },
  },
  render: () => <DatePickerRangeExample />,
}

export const Events: Story = {
  parameters: {
    docs: {
      source: { code: EventsExampleRaw, language: 'tsx' },
    },
  },
  render: () => <DatePickerEventsExample />,
}

export const DisabledDate: Story = {
  parameters: {
    docs: {
      source: { code: DisabledDateExampleRaw, language: 'tsx' },
    },
  },
  render: () => <DatePickerDisabledDateExample />,
}

export const Sizes: Story = {
  parameters: {
    docs: {
      source: { code: SizesExampleRaw, language: 'tsx' },
    },
  },
  render: () => <DatePickerSizesExample />,
}

const themeSizes = ['xs', 'sm', 'base', 'lg'] as const

export const Theme: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {themeSizes.map(size => (
        <DatePicker key={size} theme={{ size }}>
          <DatePicker.Control className="w-fit">
            <DatePicker.Trigger>
              <Button theme={{ size }}>{size}</Button>
            </DatePicker.Trigger>
          </DatePicker.Control>
          <DatePicker.Content>
            <DatePicker.DayView />
            <DatePicker.MonthView />
            <DatePicker.YearView />
          </DatePicker.Content>
        </DatePicker>
      ))}
    </div>
  ),
}
