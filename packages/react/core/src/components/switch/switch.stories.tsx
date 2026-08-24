import type { Meta, StoryObj } from 'storybook-react-rsbuild'
import { Switch } from '.'
import { SwitchBasicExample } from './examples/basic'
import BasicExampleRaw from './examples/basic.tsx?raw'
import { SwitchControlledExample } from './examples/controlled'
import ControlledExampleRaw from './examples/controlled.tsx?raw'
import { SwitchSizesExample } from './examples/sizes'
import SizesExampleRaw from './examples/sizes.tsx?raw'
import { SwitchStatesExample } from './examples/states'
import StatesExampleRaw from './examples/states.tsx?raw'
import { SwitchWithLabelExample } from './examples/with-label'
import WithLabelExampleRaw from './examples/with-label.tsx?raw'

const meta = {
  title: 'Components/Switch',
  component: Switch,
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  parameters: { docs: { source: { code: BasicExampleRaw, language: 'tsx' } } },
  render: () => <SwitchBasicExample />,
}

export const WithLabel: Story = {
  parameters: { docs: { source: { code: WithLabelExampleRaw, language: 'tsx' } } },
  render: () => <SwitchWithLabelExample />,
}

export const Controlled: Story = {
  parameters: { docs: { source: { code: ControlledExampleRaw, language: 'tsx' } } },
  render: () => <SwitchControlledExample />,
}

export const Sizes: Story = {
  parameters: { docs: { source: { code: SizesExampleRaw, language: 'tsx' } } },
  render: () => <SwitchSizesExample />,
}

export const States: Story = {
  parameters: { docs: { source: { code: StatesExampleRaw, language: 'tsx' } } },
  render: () => <SwitchStatesExample />,
}
