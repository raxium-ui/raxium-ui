import type { Meta, StoryObj } from 'storybook-react-rsbuild'
import { RatingGroup } from '.'
import { RatingGroupAllowHalfExample } from './examples/allow-half'
import AllowHalfExampleRaw from './examples/allow-half.tsx?raw'
import { RatingGroupBasicExample } from './examples/basic'
import BasicExampleRaw from './examples/basic.tsx?raw'
import { RatingGroupEventsExample } from './examples/events'
import EventsExampleRaw from './examples/events.tsx?raw'
import { RatingGroupProgrammaticExample } from './examples/programmatic'
import ProgrammaticExampleRaw from './examples/programmatic.tsx?raw'
import { RatingGroupSizesExample } from './examples/sizes'
import SizesExampleRaw from './examples/sizes.tsx?raw'
import { RatingGroupStatesExample } from './examples/states'
import StatesExampleRaw from './examples/states.tsx?raw'

const meta = {
  title: 'Components/RatingGroup',
  component: RatingGroup,
} satisfies Meta<typeof RatingGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  parameters: { docs: { source: { code: BasicExampleRaw, language: 'tsx' } } },
  render: () => <RatingGroupBasicExample />,
}

export const Sizes: Story = {
  parameters: { docs: { source: { code: SizesExampleRaw, language: 'tsx' } } },
  render: () => <RatingGroupSizesExample />,
}

export const States: Story = {
  parameters: { docs: { source: { code: StatesExampleRaw, language: 'tsx' } } },
  render: () => <RatingGroupStatesExample />,
}

export const AllowHalf: Story = {
  parameters: { docs: { source: { code: AllowHalfExampleRaw, language: 'tsx' } } },
  render: () => <RatingGroupAllowHalfExample />,
}

export const Events: Story = {
  parameters: { docs: { source: { code: EventsExampleRaw, language: 'tsx' } } },
  render: () => <RatingGroupEventsExample />,
}

export const Programmatic: Story = {
  parameters: { docs: { source: { code: ProgrammaticExampleRaw, language: 'tsx' } } },
  render: () => <RatingGroupProgrammaticExample />,
}
