import type { Meta, StoryObj } from 'storybook-react-rsbuild'
import { NumberInput } from '.'
import { NumberInputBasicExample } from './examples/basic'
import BasicExampleRaw from './examples/basic.tsx?raw'
import { NumberInputEventsExample } from './examples/events'
import EventsExampleRaw from './examples/events.tsx?raw'
import { NumberInputFormatExample } from './examples/format'
import FormatExampleRaw from './examples/format.tsx?raw'
import { NumberInputProgrammaticExample } from './examples/programmatic'
import ProgrammaticExampleRaw from './examples/programmatic.tsx?raw'
import { NumberInputSizesExample } from './examples/sizes'
import SizesExampleRaw from './examples/sizes.tsx?raw'
import { NumberInputStatesExample } from './examples/states'
import StatesExampleRaw from './examples/states.tsx?raw'
import { NumberInputTriggersExample } from './examples/triggers'
import TriggersExampleRaw from './examples/triggers.tsx?raw'

const meta = {
  title: 'Components/NumberInput',
  component: NumberInput,
} satisfies Meta<typeof NumberInput>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  parameters: { docs: { source: { code: BasicExampleRaw, language: 'tsx' } } },
  render: () => <NumberInputBasicExample />,
}

export const Triggers: Story = {
  parameters: { docs: { source: { code: TriggersExampleRaw, language: 'tsx' } } },
  render: () => <NumberInputTriggersExample />,
}

export const Sizes: Story = {
  parameters: { docs: { source: { code: SizesExampleRaw, language: 'tsx' } } },
  render: () => <NumberInputSizesExample />,
}

export const States: Story = {
  parameters: { docs: { source: { code: StatesExampleRaw, language: 'tsx' } } },
  render: () => <NumberInputStatesExample />,
}

export const Format: Story = {
  parameters: { docs: { source: { code: FormatExampleRaw, language: 'tsx' } } },
  render: () => <NumberInputFormatExample />,
}

export const Events: Story = {
  parameters: { docs: { source: { code: EventsExampleRaw, language: 'tsx' } } },
  render: () => <NumberInputEventsExample />,
}

export const Programmatic: Story = {
  parameters: { docs: { source: { code: ProgrammaticExampleRaw, language: 'tsx' } } },
  render: () => <NumberInputProgrammaticExample />,
}
