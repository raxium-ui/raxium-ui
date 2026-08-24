import type { Meta, StoryObj } from 'storybook-react-rsbuild'
import { Tooltip } from '.'
import { TooltipBasicExample } from './examples/basic'
import BasicExampleRaw from './examples/basic.tsx?raw'
import { TooltipDisabledExample } from './examples/disabled'
import DisabledExampleRaw from './examples/disabled.tsx?raw'

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  parameters: { docs: { source: { code: BasicExampleRaw, language: 'tsx' } } },
  render: () => <TooltipBasicExample />,
}

export const Disabled: Story = {
  parameters: { docs: { source: { code: DisabledExampleRaw, language: 'tsx' } } },
  render: () => <TooltipDisabledExample />,
}
