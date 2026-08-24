import type { Meta, StoryObj } from 'storybook-react-rsbuild'
import { SelectBasicExample } from './examples/basic'
import BasicExampleRaw from './examples/basic.tsx?raw'
import { SelectControlledOpenAndHighlightExample } from './examples/controlled-open-and-highlight'
import ControlledOpenAndHighlightExampleRaw from './examples/controlled-open-and-highlight.tsx?raw'
import { SelectGroupsAndDisabledExample } from './examples/groups-and-disabled'
import GroupsAndDisabledExampleRaw from './examples/groups-and-disabled.tsx?raw'
import { SelectMultipleAndClearableExample } from './examples/multiple-and-clearable'
import MultipleAndClearableExampleRaw from './examples/multiple-and-clearable.tsx?raw'
import { SelectSizesExample } from './examples/sizes'
import SizesExampleRaw from './examples/sizes.tsx?raw'

const meta = {
  title: 'Components/Select',
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  parameters: {
    docs: {
      source: { code: BasicExampleRaw, language: 'tsx' },
    },
  },
  render: () => <SelectBasicExample />,
}

export const GroupsAndDisabled: Story = {
  parameters: {
    docs: {
      source: { code: GroupsAndDisabledExampleRaw, language: 'tsx' },
    },
  },
  render: () => <SelectGroupsAndDisabledExample />,
}

export const MultipleAndClearable: Story = {
  parameters: {
    docs: {
      source: { code: MultipleAndClearableExampleRaw, language: 'tsx' },
    },
  },
  render: () => <SelectMultipleAndClearableExample />,
}

export const Sizes: Story = {
  parameters: {
    docs: {
      source: { code: SizesExampleRaw, language: 'tsx' },
    },
  },
  render: () => <SelectSizesExample />,
}

export const ControlledOpenAndHighlight: Story = {
  parameters: {
    docs: {
      source: { code: ControlledOpenAndHighlightExampleRaw, language: 'tsx' },
    },
  },
  render: () => <SelectControlledOpenAndHighlightExample />,
}
