import type { Meta, StoryObj } from 'storybook-react-rsbuild'
import { PinInput } from '.'
import { PinInputBasicExample } from './examples/basic'
import BasicExampleRaw from './examples/basic.tsx?raw'
import { PinInputEventsExample } from './examples/events'
import EventsExampleRaw from './examples/events.tsx?raw'
import { PinInputSeparatorExample } from './examples/separator'
import SeparatorExampleRaw from './examples/separator.tsx?raw'
import { PinInputSizesExample } from './examples/sizes'
import SizesExampleRaw from './examples/sizes.tsx?raw'
import { PinInputStatesExample } from './examples/states'
import StatesExampleRaw from './examples/states.tsx?raw'

const meta = {
  title: 'Components/PinInput',
  component: PinInput,
} satisfies Meta<typeof PinInput>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  parameters: { docs: { source: { code: BasicExampleRaw, language: 'tsx' } } },
  render: () => <PinInputBasicExample />,
}

export const Sizes: Story = {
  parameters: { docs: { source: { code: SizesExampleRaw, language: 'tsx' } } },
  render: () => <PinInputSizesExample />,
}

export const States: Story = {
  parameters: { docs: { source: { code: StatesExampleRaw, language: 'tsx' } } },
  render: () => <PinInputStatesExample />,
}

export const Separator: Story = {
  parameters: { docs: { source: { code: SeparatorExampleRaw, language: 'tsx' } } },
  render: () => <PinInputSeparatorExample />,
}

export const Events: Story = {
  parameters: { docs: { source: { code: EventsExampleRaw, language: 'tsx' } } },
  render: () => <PinInputEventsExample />,
}
