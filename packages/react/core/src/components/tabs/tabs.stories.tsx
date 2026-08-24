import type { Meta, StoryObj } from 'storybook-react-rsbuild'
import { Tabs } from '.'
import { TabsBasicExample } from './examples/basic'
import BasicExampleRaw from './examples/basic.tsx?raw'
import { TabsControlledExample } from './examples/controlled'
import ControlledExampleRaw from './examples/controlled.tsx?raw'
import { TabsDisabledAndNoIndicatorExample } from './examples/disabled-and-no-indicator'
import DisabledAndNoIndicatorExampleRaw from './examples/disabled-and-no-indicator.tsx?raw'
import { TabsDynamicTriggersExample } from './examples/dynamic-triggers'
import DynamicTriggersExampleRaw from './examples/dynamic-triggers.tsx?raw'
import { TabsScrollableListExample } from './examples/scrollable-list'
import ScrollableListExampleRaw from './examples/scrollable-list.tsx?raw'
import { TabsSizesExample } from './examples/sizes'
import SizesExampleRaw from './examples/sizes.tsx?raw'

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  parameters: {
    docs: {
      source: { code: BasicExampleRaw, language: 'tsx' },
    },
  },
  render: () => <TabsBasicExample />,
}

export const Controlled: Story = {
  parameters: {
    docs: {
      source: { code: ControlledExampleRaw, language: 'tsx' },
    },
  },
  render: () => <TabsControlledExample />,
}

export const DynamicTriggers: Story = {
  parameters: {
    docs: {
      source: { code: DynamicTriggersExampleRaw, language: 'tsx' },
    },
  },
  render: () => <TabsDynamicTriggersExample />,
}

export const ScrollableList: Story = {
  parameters: {
    docs: {
      source: { code: ScrollableListExampleRaw, language: 'tsx' },
    },
  },
  render: () => <TabsScrollableListExample />,
}

export const Sizes: Story = {
  parameters: {
    docs: {
      source: { code: SizesExampleRaw, language: 'tsx' },
    },
  },
  render: () => <TabsSizesExample />,
}

export const DisabledAndNoIndicator: Story = {
  parameters: {
    docs: {
      source: { code: DisabledAndNoIndicatorExampleRaw, language: 'tsx' },
    },
  },
  render: () => <TabsDisabledAndNoIndicatorExample />,
}
