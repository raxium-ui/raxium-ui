import type { Meta, StoryObj } from 'storybook-react-rsbuild'
import { MenuBasicExample } from './examples/basic'
import BasicExampleRaw from './examples/basic.tsx?raw'
import { MenuCheckboxExample } from './examples/checkbox'
import CheckboxExampleRaw from './examples/checkbox.tsx?raw'
import { MenuContextTriggerExample } from './examples/context-trigger'
import ContextTriggerExampleRaw from './examples/context-trigger.tsx?raw'
import { MenuControlledOpenExample } from './examples/controlled-open'
import ControlledOpenExampleRaw from './examples/controlled-open.tsx?raw'
import { MenuRadioExample } from './examples/radio'
import RadioExampleRaw from './examples/radio.tsx?raw'
import { MenuSizesExample } from './examples/sizes'
import SizesExampleRaw from './examples/sizes.tsx?raw'
import { MenuSubmenuExample } from './examples/submenu'
import SubmenuExampleRaw from './examples/submenu.tsx?raw'

const meta = {
  title: 'Components/Menu',
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  parameters: { docs: { source: { code: BasicExampleRaw, language: 'tsx' } } },
  render: () => <MenuBasicExample />,
}

export const Submenu: Story = {
  parameters: { docs: { source: { code: SubmenuExampleRaw, language: 'tsx' } } },
  render: () => <MenuSubmenuExample />,
}

export const Checkbox: Story = {
  parameters: { docs: { source: { code: CheckboxExampleRaw, language: 'tsx' } } },
  render: () => <MenuCheckboxExample />,
}

export const Radio: Story = {
  parameters: { docs: { source: { code: RadioExampleRaw, language: 'tsx' } } },
  render: () => <MenuRadioExample />,
}

export const ContextTrigger: Story = {
  parameters: { docs: { source: { code: ContextTriggerExampleRaw, language: 'tsx' } } },
  render: () => <MenuContextTriggerExample />,
}

export const ControlledOpen: Story = {
  parameters: { docs: { source: { code: ControlledOpenExampleRaw, language: 'tsx' } } },
  render: () => <MenuControlledOpenExample />,
}

export const Sizes: Story = {
  parameters: { docs: { source: { code: SizesExampleRaw, language: 'tsx' } } },
  render: () => <MenuSizesExample />,
}
