import type { Meta, StoryObj } from 'storybook-react-rsbuild'
import { HoverCard } from '.'
import { HoverCardBasicExample } from './examples/basic'
import BasicExampleRaw from './examples/basic.tsx?raw'
import { HoverCardControlledAndContextExample } from './examples/controlled-and-context'
import ControlledAndContextExampleRaw from './examples/controlled-and-context.tsx?raw'
import { HoverCardCustomContentExample } from './examples/custom-content'
import CustomContentExampleRaw from './examples/custom-content.tsx?raw'
import { HoverCardDelaysAndPositioningExample } from './examples/delays-and-positioning'
import DelaysAndPositioningExampleRaw from './examples/delays-and-positioning.tsx?raw'
import { HoverCardThemesAndVariantsExample } from './examples/themes-and-variants'
import ThemesAndVariantsExampleRaw from './examples/themes-and-variants.tsx?raw'

const meta = {
  title: 'Components/HoverCard',
  component: HoverCard,
} satisfies Meta<typeof HoverCard>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  parameters: { docs: { source: { code: BasicExampleRaw, language: 'tsx' } } },
  render: () => <HoverCardBasicExample />,
}

export const DelaysAndPositioning: Story = {
  parameters: { docs: { source: { code: DelaysAndPositioningExampleRaw, language: 'tsx' } } },
  render: () => <HoverCardDelaysAndPositioningExample />,
}

export const ControlledAndContext: Story = {
  parameters: { docs: { source: { code: ControlledAndContextExampleRaw, language: 'tsx' } } },
  render: () => <HoverCardControlledAndContextExample />,
}

export const ThemesAndVariants: Story = {
  parameters: { docs: { source: { code: ThemesAndVariantsExampleRaw, language: 'tsx' } } },
  render: () => <HoverCardThemesAndVariantsExample />,
}

export const CustomContent: Story = {
  parameters: { docs: { source: { code: CustomContentExampleRaw, language: 'tsx' } } },
  render: () => <HoverCardCustomContentExample />,
}
