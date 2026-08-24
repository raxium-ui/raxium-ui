import type { Meta, StoryObj } from 'storybook-react-rsbuild'
import { ToasterManager } from '.'
import { ToastBasicExample } from './examples/basic'
import BasicExampleRaw from './examples/basic.tsx?raw'

const meta = {
  title: 'Components/Toast',
  component: ToasterManager,
} satisfies Meta<typeof ToasterManager>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  parameters: { docs: { source: { code: BasicExampleRaw, language: 'tsx' } } },
  render: () => <ToastBasicExample />,
}
