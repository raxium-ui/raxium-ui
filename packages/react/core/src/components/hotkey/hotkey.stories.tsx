import type { Meta, StoryObj } from 'storybook-react-rsbuild'
import { Hotkey } from '.'
import { HotkeyBasicExample } from './examples/basic'
import BasicExampleRaw from './examples/basic.tsx?raw'
import { HotkeyEventsExample } from './examples/events'
import EventsExampleRaw from './examples/events.tsx?raw'
import { HotkeyPlaceholderExample } from './examples/placeholder'
import PlaceholderExampleRaw from './examples/placeholder.tsx?raw'
import { HotkeySizesExample } from './examples/sizes'
import SizesExampleRaw from './examples/sizes.tsx?raw'
import { HotkeyStatesExample } from './examples/states'
import StatesExampleRaw from './examples/states.tsx?raw'

const meta = {
  title: 'Components/Hotkey',
  component: Hotkey,
} satisfies Meta<typeof Hotkey>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  parameters: { docs: { source: { code: BasicExampleRaw, language: 'tsx' } } },
  render: () => <HotkeyBasicExample />,
}

export const Sizes: Story = {
  parameters: { docs: { source: { code: SizesExampleRaw, language: 'tsx' } } },
  render: () => <HotkeySizesExample />,
}

export const States: Story = {
  parameters: { docs: { source: { code: StatesExampleRaw, language: 'tsx' } } },
  render: () => <HotkeyStatesExample />,
}

export const Placeholder: Story = {
  parameters: { docs: { source: { code: PlaceholderExampleRaw, language: 'tsx' } } },
  render: () => <HotkeyPlaceholderExample />,
}

export const Events: Story = {
  parameters: { docs: { source: { code: EventsExampleRaw, language: 'tsx' } } },
  render: () => <HotkeyEventsExample />,
}
