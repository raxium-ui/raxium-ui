import type { Meta, StoryObj } from 'storybook-react-rsbuild'
import { Tree } from '.'
import { TreeBasicExample } from './examples/basic'
import BasicExampleRaw from './examples/basic.tsx?raw'

const meta = {
  title: 'Components/Tree',
  component: Tree,
} as Meta

export default meta
type Story = StoryObj

export const Basic: Story = {
  parameters: { docs: { source: { code: BasicExampleRaw, language: 'tsx' } } },
  render: () => <TreeBasicExample />,
}
