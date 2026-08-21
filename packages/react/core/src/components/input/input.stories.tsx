import type { Meta, StoryObj } from 'storybook-react-rsbuild'
import { Input } from '.'
import { InputBasicExample } from './examples/basic'
import BasicExampleRaw from './examples/basic.tsx?raw'
import { InputPrefixSuffixAndUiExample } from './examples/prefix-suffix-and-ui'
import PrefixSuffixAndUiExampleRaw from './examples/prefix-suffix-and-ui.tsx?raw'
import { InputSizesExample } from './examples/sizes'
import SizesExampleRaw from './examples/sizes.tsx?raw'
import { InputStatesExample } from './examples/states'
import StatesExampleRaw from './examples/states.tsx?raw'

const meta = {
  title: 'Components/Input',
  component: Input,
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  parameters: { docs: { source: { code: BasicExampleRaw, language: 'tsx' } } },
  render: () => <InputBasicExample />,
}

export const States: Story = {
  parameters: { docs: { source: { code: StatesExampleRaw, language: 'tsx' } } },
  render: () => <InputStatesExample />,
}

export const Sizes: Story = {
  parameters: { docs: { source: { code: SizesExampleRaw, language: 'tsx' } } },
  render: () => <InputSizesExample />,
}

export const PrefixSuffixAndUi: Story = {
  parameters: { docs: { source: { code: PrefixSuffixAndUiExampleRaw, language: 'tsx' } } },
  render: () => <InputPrefixSuffixAndUiExample />,
}
