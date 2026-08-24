import type { Meta, StoryObj } from 'storybook-react-rsbuild'
import { SliderBasicExample } from './examples/basic'
import BasicExampleRaw from './examples/basic.tsx?raw'
import { SliderControlledExample } from './examples/controlled'
import ControlledExampleRaw from './examples/controlled.tsx?raw'
import { SliderMarkersAndTooltipsExample } from './examples/markers-and-tooltips'
import MarkersAndTooltipsExampleRaw from './examples/markers-and-tooltips.tsx?raw'
import { SliderRangeExample } from './examples/range'
import RangeExampleRaw from './examples/range.tsx?raw'
import { SliderSizesExample } from './examples/sizes'
import SizesExampleRaw from './examples/sizes.tsx?raw'
import { SliderVerticalAndDisabledExample } from './examples/vertical-and-disabled'
import VerticalAndDisabledExampleRaw from './examples/vertical-and-disabled.tsx?raw'

const meta = {
  title: 'Components/Slider',
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  parameters: { docs: { source: { code: BasicExampleRaw, language: 'tsx' } } },
  render: () => <SliderBasicExample />,
}

export const Range: Story = {
  parameters: { docs: { source: { code: RangeExampleRaw, language: 'tsx' } } },
  render: () => <SliderRangeExample />,
}

export const MarkersAndTooltips: Story = {
  parameters: { docs: { source: { code: MarkersAndTooltipsExampleRaw, language: 'tsx' } } },
  render: () => <SliderMarkersAndTooltipsExample />,
}

export const Sizes: Story = {
  parameters: { docs: { source: { code: SizesExampleRaw, language: 'tsx' } } },
  render: () => <SliderSizesExample />,
}

export const VerticalAndDisabled: Story = {
  parameters: { docs: { source: { code: VerticalAndDisabledExampleRaw, language: 'tsx' } } },
  render: () => <SliderVerticalAndDisabledExample />,
}

export const Controlled: Story = {
  parameters: { docs: { source: { code: ControlledExampleRaw, language: 'tsx' } } },
  render: () => <SliderControlledExample />,
}
