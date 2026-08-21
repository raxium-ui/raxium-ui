import type { Meta, StoryObj } from 'storybook-react-rsbuild'
import { Badge } from '.'
import { BadgeBasicExample } from './examples/basic'
import BasicExampleRaw from './examples/basic.tsx?raw'
import { BadgeDotExample } from './examples/dot'
import DotExampleRaw from './examples/dot.tsx?raw'
import { BadgeSecondaryExample } from './examples/secondary'
import SecondaryExampleRaw from './examples/secondary.tsx?raw'

const meta = {
  title: 'Components/Badge',
  component: Badge,
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  parameters: {
    docs: {
      source: { code: BasicExampleRaw, language: 'tsx' },
    },
  },
  render: () => <BadgeBasicExample />,
}

export const Secondary: Story = {
  parameters: {
    docs: {
      source: { code: SecondaryExampleRaw, language: 'tsx' },
    },
  },
  render: () => <BadgeSecondaryExample />,
}

export const Dot: Story = {
  parameters: {
    docs: {
      source: { code: DotExampleRaw, language: 'tsx' },
    },
  },
  render: () => <BadgeDotExample />,
}

export const Theme: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Badge theme={{ size: 'sm' }}>Small</Badge>
      <Badge theme={{ size: 'lg', skin: 'razer' }}>Large</Badge>
    </div>
  ),
}
