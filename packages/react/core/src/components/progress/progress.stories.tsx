import type { Meta, StoryObj } from 'storybook-react-rsbuild'
import { Progress } from '.'
import { ProgressBasicExample } from './examples/basic'
import BasicExampleRaw from './examples/basic.tsx?raw'
import { ProgressCircleAndArcExample } from './examples/circle-and-arc'
import CircleAndArcExampleRaw from './examples/circle-and-arc.tsx?raw'
import { ProgressCustomUiExample } from './examples/custom-ui'
import CustomUiExampleRaw from './examples/custom-ui.tsx?raw'
import { ProgressLinearVariantsExample } from './examples/linear-variants'
import LinearVariantsExampleRaw from './examples/linear-variants.tsx?raw'
import { ProgressSizesAndOrientationExample } from './examples/sizes-and-orientation'
import SizesAndOrientationExampleRaw from './examples/sizes-and-orientation.tsx?raw'

const meta = {
  title: 'Components/Progress',
  component: Progress,
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  parameters: { docs: { source: { code: BasicExampleRaw, language: 'tsx' } } },
  render: () => <ProgressBasicExample />,
}

export const LinearVariants: Story = {
  parameters: { docs: { source: { code: LinearVariantsExampleRaw, language: 'tsx' } } },
  render: () => <ProgressLinearVariantsExample />,
}

export const SizesAndOrientation: Story = {
  parameters: { docs: { source: { code: SizesAndOrientationExampleRaw, language: 'tsx' } } },
  render: () => <ProgressSizesAndOrientationExample />,
}

export const CircleAndArc: Story = {
  parameters: { docs: { source: { code: CircleAndArcExampleRaw, language: 'tsx' } } },
  render: () => <ProgressCircleAndArcExample />,
}

export const CustomUi: Story = {
  parameters: { docs: { source: { code: CustomUiExampleRaw, language: 'tsx' } } },
  render: () => <ProgressCustomUiExample />,
}
