import type { Meta, StoryObj } from 'storybook-react-rsbuild'
import { PaginationBasicExample } from './examples/basic'
import BasicExampleRaw from './examples/basic.tsx?raw'
import { PaginationControlledExample } from './examples/controlled'
import ControlledExampleRaw from './examples/controlled.tsx?raw'
import { PaginationDynamicEndExample } from './examples/dynamic-end'
import DynamicEndExampleRaw from './examples/dynamic-end.tsx?raw'
import { PaginationEventsExample } from './examples/events'
import EventsExampleRaw from './examples/events.tsx?raw'
import { PaginationLinkTypeExample } from './examples/link-type'
import LinkTypeExampleRaw from './examples/link-type.tsx?raw'
import { PaginationMinimalExample } from './examples/minimal'
import MinimalExampleRaw from './examples/minimal.tsx?raw'
import { PaginationSizesExample } from './examples/sizes'
import SizesExampleRaw from './examples/sizes.tsx?raw'

const meta = {
  title: 'Components/Pagination',
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  parameters: { docs: { source: { code: BasicExampleRaw, language: 'tsx' } } },
  render: () => <PaginationBasicExample />,
}

export const Minimal: Story = {
  parameters: { docs: { source: { code: MinimalExampleRaw, language: 'tsx' } } },
  render: () => <PaginationMinimalExample />,
}

export const Sizes: Story = {
  parameters: { docs: { source: { code: SizesExampleRaw, language: 'tsx' } } },
  render: () => <PaginationSizesExample />,
}

export const Controlled: Story = {
  parameters: { docs: { source: { code: ControlledExampleRaw, language: 'tsx' } } },
  render: () => <PaginationControlledExample />,
}

export const Events: Story = {
  parameters: { docs: { source: { code: EventsExampleRaw, language: 'tsx' } } },
  render: () => <PaginationEventsExample />,
}

export const LinkType: Story = {
  parameters: { docs: { source: { code: LinkTypeExampleRaw, language: 'tsx' } } },
  render: () => <PaginationLinkTypeExample />,
}

export const DynamicEnd: Story = {
  parameters: { docs: { source: { code: DynamicEndExampleRaw, language: 'tsx' } } },
  render: () => <PaginationDynamicEndExample />,
}
