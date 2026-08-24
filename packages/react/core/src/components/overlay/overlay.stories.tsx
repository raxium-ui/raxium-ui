import type { Meta, StoryObj } from 'storybook-react-rsbuild'
import { OverlayProvider } from '.'
import { OverlayBasicExample } from './examples/basic'
import BasicExampleRaw from './examples/basic.tsx?raw'

const meta = {
  title: 'Components/Overlay',
  component: OverlayProvider,
} satisfies Meta<typeof OverlayProvider>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  parameters: { docs: { source: { code: BasicExampleRaw, language: 'tsx' } } },
  render: () => <OverlayBasicExample />,
}
