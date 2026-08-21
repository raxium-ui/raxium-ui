import type { Meta, StoryObj } from 'storybook-react-rsbuild'
import { Button } from '.'
import { ButtonBasicExample } from './examples/basic'
import BasicExampleRaw from './examples/basic.tsx?raw'
import { ButtonCraftsExample } from './examples/crafts'
import CraftsExampleRaw from './examples/crafts.tsx?raw'
import { ButtonSizesExample } from './examples/sizes'
import SizesExampleRaw from './examples/sizes.tsx?raw'
import { ButtonVariantsExample } from './examples/variants'
import VariantsExampleRaw from './examples/variants.tsx?raw'

const meta = {
  title: 'Components/Button',
  component: Button,
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  parameters: {
    docs: {
      source: { code: BasicExampleRaw, language: 'tsx' },
    },
  },
  render: () => <ButtonBasicExample />,
}

export const Variants: Story = {
  parameters: {
    docs: {
      source: { code: VariantsExampleRaw, language: 'tsx' },
    },
  },
  render: () => <ButtonVariantsExample />,
}

export const Sizes: Story = {
  parameters: {
    docs: {
      source: { code: SizesExampleRaw, language: 'tsx' },
    },
  },
  render: () => <ButtonSizesExample />,
}

export const Crafts: Story = {
  parameters: {
    docs: {
      source: { code: CraftsExampleRaw, language: 'tsx' },
    },
  },
  render: () => <ButtonCraftsExample />,
}

export const Theme: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button theme={{ size: 'sm' }}>Small</Button>
      <Button theme={{ size: 'lg', skin: 'razer' }}>Large</Button>
    </div>
  ),
}

export const UI: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button ui={{ root: 'bg-red-500' }}>Custom</Button>
      <Button loading ui={{ loading: 'text-blue-500' }}>
        Loading
      </Button>
    </div>
  ),
}
