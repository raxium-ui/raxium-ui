import type { Meta, StoryObj } from 'storybook-react-rsbuild'
import { IconBasicExample } from './examples/basic'
import BasicExampleRaw from './examples/basic.tsx?raw'
import { IconColorAndClassExample } from './examples/color-and-class'
import ColorAndClassExampleRaw from './examples/color-and-class.tsx?raw'
import { IconSizesExample } from './examples/sizes'
import SizesExampleRaw from './examples/sizes.tsx?raw'

const meta = {
  title: 'Components/Icon',
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  parameters: { docs: { source: { code: BasicExampleRaw, language: 'tsx' } } },
  render: () => <IconBasicExample />,
}

export const Sizes: Story = {
  parameters: { docs: { source: { code: SizesExampleRaw, language: 'tsx' } } },
  render: () => <IconSizesExample />,
}

export const ColorAndClass: Story = {
  parameters: { docs: { source: { code: ColorAndClassExampleRaw, language: 'tsx' } } },
  render: () => <IconColorAndClassExample />,
}
