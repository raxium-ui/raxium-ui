import type { Meta, StoryObj } from 'storybook-react-rsbuild'
import { Editable } from '.'
import { EditableBasicExample } from './examples/basic'
import BasicExampleRaw from './examples/basic.tsx?raw'
import { EditableCustomControlsExample } from './examples/custom-controls'
import CustomControlsExampleRaw from './examples/custom-controls.tsx?raw'
import { EditableSizesExample } from './examples/sizes'
import SizesExampleRaw from './examples/sizes.tsx?raw'
import { EditableStatesExample } from './examples/states'
import StatesExampleRaw from './examples/states.tsx?raw'

const meta = {
  title: 'Components/Editable',
  component: Editable,
} satisfies Meta<typeof Editable>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  parameters: { docs: { source: { code: BasicExampleRaw, language: 'tsx' } } },
  render: () => <EditableBasicExample />,
}

export const Sizes: Story = {
  parameters: { docs: { source: { code: SizesExampleRaw, language: 'tsx' } } },
  render: () => <EditableSizesExample />,
}

export const States: Story = {
  parameters: { docs: { source: { code: StatesExampleRaw, language: 'tsx' } } },
  render: () => <EditableStatesExample />,
}

export const CustomControls: Story = {
  parameters: { docs: { source: { code: CustomControlsExampleRaw, language: 'tsx' } } },
  render: () => <EditableCustomControlsExample />,
}
