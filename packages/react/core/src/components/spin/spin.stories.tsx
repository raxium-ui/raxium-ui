import type { Meta, StoryObj } from 'storybook-react-rsbuild'
import { Spin } from '.'
import { SpinBasicExample } from './examples/basic'
import BasicExampleRaw from './examples/basic.tsx?raw'

const meta = {
  title: 'Components/Spin',
  component: Spin,
} satisfies Meta<typeof Spin>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  parameters: { docs: { source: { code: BasicExampleRaw, language: 'tsx' } } },
  render: () => <SpinBasicExample />,
}
