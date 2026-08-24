import type { Meta, StoryObj } from 'storybook-react-rsbuild'
import { Messager } from '.'
import { MessageBasicExample } from './examples/basic'
import BasicExampleRaw from './examples/basic.tsx?raw'

const meta = {
  title: 'Components/Message',
  component: Messager,
} satisfies Meta<typeof Messager>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  parameters: { docs: { source: { code: BasicExampleRaw, language: 'tsx' } } },
  render: () => <MessageBasicExample />,
}
