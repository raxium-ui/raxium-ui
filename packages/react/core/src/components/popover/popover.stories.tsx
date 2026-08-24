import type { Meta, StoryObj } from 'storybook-react-rsbuild'
import { Popover } from '.'
import { PopoverBasicExample } from './examples/basic'
import BasicExampleRaw from './examples/basic.tsx?raw'
import { PopoverControlledExample } from './examples/controlled'
import ControlledExampleRaw from './examples/controlled.tsx?raw'

const meta = {
  title: 'Components/Popover',
  component: Popover,
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  parameters: { docs: { source: { code: BasicExampleRaw, language: 'tsx' } } },
  render: () => <PopoverBasicExample />,
}

export const Controlled: Story = {
  parameters: { docs: { source: { code: ControlledExampleRaw, language: 'tsx' } } },
  render: () => <PopoverControlledExample />,
}
