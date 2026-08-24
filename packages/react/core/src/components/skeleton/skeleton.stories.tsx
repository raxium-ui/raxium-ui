import type { Meta, StoryObj } from 'storybook-react-rsbuild'
import { Skeleton } from '.'
import { SkeletonBasicExample } from './examples/basic'
import BasicExampleRaw from './examples/basic.tsx?raw'
import { SkeletonShapesExample } from './examples/shapes'
import ShapesExampleRaw from './examples/shapes.tsx?raw'
import { SkeletonVariantsExample } from './examples/variants'
import VariantsExampleRaw from './examples/variants.tsx?raw'
import { SkeletonWithChildrenExample } from './examples/with-children'
import WithChildrenExampleRaw from './examples/with-children.tsx?raw'

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  parameters: { docs: { source: { code: BasicExampleRaw, language: 'tsx' } } },
  render: () => <SkeletonBasicExample />,
}

export const Variants: Story = {
  parameters: { docs: { source: { code: VariantsExampleRaw, language: 'tsx' } } },
  render: () => <SkeletonVariantsExample />,
}

export const Shapes: Story = {
  parameters: { docs: { source: { code: ShapesExampleRaw, language: 'tsx' } } },
  render: () => <SkeletonShapesExample />,
}

export const WithChildren: Story = {
  parameters: { docs: { source: { code: WithChildrenExampleRaw, language: 'tsx' } } },
  render: () => <SkeletonWithChildrenExample />,
}
