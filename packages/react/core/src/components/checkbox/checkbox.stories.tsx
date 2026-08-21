import type { Meta, StoryObj } from 'storybook-react-rsbuild'
import { Checkbox } from '.'
import { CheckboxBasicExample } from './examples/basic'
import BasicExampleRaw from './examples/basic.tsx?raw'
import { CheckboxGroupExample } from './examples/group'
import GroupExampleRaw from './examples/group.tsx?raw'
import { CheckboxIndicatorExample } from './examples/indicator'
import IndicatorExampleRaw from './examples/indicator.tsx?raw'
import { CheckboxSizesExample } from './examples/sizes'
import SizesExampleRaw from './examples/sizes.tsx?raw'
import { CheckboxStatesExample } from './examples/states'
import StatesExampleRaw from './examples/states.tsx?raw'

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  parameters: {
    docs: {
      source: { code: BasicExampleRaw, language: 'tsx' },
    },
  },
  render: () => <CheckboxBasicExample />,
}

export const States: Story = {
  parameters: {
    docs: {
      source: { code: StatesExampleRaw, language: 'tsx' },
    },
  },
  render: () => <CheckboxStatesExample />,
}

export const Sizes: Story = {
  parameters: {
    docs: {
      source: { code: SizesExampleRaw, language: 'tsx' },
    },
  },
  render: () => <CheckboxSizesExample />,
}

export const Group: Story = {
  parameters: {
    docs: {
      source: { code: GroupExampleRaw, language: 'tsx' },
    },
  },
  render: () => <CheckboxGroupExample />,
}

export const Indicator: Story = {
  parameters: {
    docs: {
      source: { code: IndicatorExampleRaw, language: 'tsx' },
    },
  },
  render: () => <CheckboxIndicatorExample />,
}

export const Theme: Story = {
  render: () => (
    <div className="w-full flex items-center gap-6">
      <Checkbox id="theme-example-small" label="Small" theme={{ size: 'sm' }} />
      <Checkbox
        id="theme-example-large"
        label="Large"
        theme={{ size: 'lg', skin: 'razer' }}
        defaultChecked
      />
    </div>
  ),
}

export const UI: Story = {
  render: () => (
    <div className="w-full flex items-center gap-6">
      <Checkbox
        label="Custom Control"
        id="ui-example-custom-control"
        ui={{
          root: 'gap-3',
          control: 'border-white data-[state=checked]:bg-white',
          label: 'text-yellow-500 font-medium',
        }}
      />
      <Checkbox
        defaultChecked
        id="ui-example-custom-indicator"
        label="Custom Indicator"
        ui={{
          indicator: '[&>svg]:stroke-blue-500',
          control: 'border-white data-[state=checked]:bg-white',
        }}
      />
    </div>
  ),
}
