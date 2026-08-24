import type { Meta, StoryObj } from 'storybook-react-rsbuild'
import { ScrollArea } from '.'
import { ScrollAreaBasicExample } from './examples/basic'
import BasicExampleRaw from './examples/basic.tsx?raw'
import { ScrollAreaBothAxesExample } from './examples/both-axes'
import BothAxesExampleRaw from './examples/both-axes.tsx?raw'
import { ScrollAreaCustomUiExample } from './examples/custom-ui'
import CustomUiExampleRaw from './examples/custom-ui.tsx?raw'
import { ScrollAreaSizesExample } from './examples/sizes'
import SizesExampleRaw from './examples/sizes.tsx?raw'

const meta = {
  title: 'Components/ScrollArea',
  component: ScrollArea,
} satisfies Meta<typeof ScrollArea>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  parameters: {
    docs: {
      source: { code: BasicExampleRaw, language: 'tsx' },
    },
  },
  render: () => <ScrollAreaBasicExample />,
}

export const BothAxes: Story = {
  parameters: {
    docs: {
      source: { code: BothAxesExampleRaw, language: 'tsx' },
    },
  },
  render: () => <ScrollAreaBothAxesExample />,
}

export const Sizes: Story = {
  parameters: {
    docs: {
      source: { code: SizesExampleRaw, language: 'tsx' },
    },
  },
  render: () => <ScrollAreaSizesExample />,
}

export const CustomUi: Story = {
  parameters: {
    docs: {
      source: { code: CustomUiExampleRaw, language: 'tsx' },
    },
  },
  render: () => <ScrollAreaCustomUiExample />,
}
