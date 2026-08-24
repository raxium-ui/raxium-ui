import type { Meta, StoryObj } from 'storybook-react-rsbuild'
import { TagsInputBasicExample } from './examples/basic'
import BasicExampleRaw from './examples/basic.tsx?raw'
import { TagsInputEventsExample } from './examples/events'
import EventsExampleRaw from './examples/events.tsx?raw'
import { TagsInputInlineExample } from './examples/inline'
import InlineExampleRaw from './examples/inline.tsx?raw'
import { TagsInputMaxAndValidateExample } from './examples/max-and-validate'
import MaxAndValidateExampleRaw from './examples/max-and-validate.tsx?raw'
import { TagsInputProgrammaticExample } from './examples/programmatic'
import ProgrammaticExampleRaw from './examples/programmatic.tsx?raw'
import { TagsInputSizesExample } from './examples/sizes'
import SizesExampleRaw from './examples/sizes.tsx?raw'
import { TagsInputStatesExample } from './examples/states'
import StatesExampleRaw from './examples/states.tsx?raw'

const meta = {
  title: 'Components/TagsInput',
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  parameters: {
    docs: {
      source: { code: BasicExampleRaw, language: 'tsx' },
    },
  },
  render: () => <TagsInputBasicExample />,
}

export const Sizes: Story = {
  parameters: {
    docs: {
      source: { code: SizesExampleRaw, language: 'tsx' },
    },
  },
  render: () => <TagsInputSizesExample />,
}

export const Inline: Story = {
  parameters: {
    docs: {
      source: { code: InlineExampleRaw, language: 'tsx' },
    },
  },
  render: () => <TagsInputInlineExample />,
}

export const States: Story = {
  parameters: {
    docs: {
      source: { code: StatesExampleRaw, language: 'tsx' },
    },
  },
  render: () => <TagsInputStatesExample />,
}

export const MaxAndValidate: Story = {
  parameters: {
    docs: {
      source: { code: MaxAndValidateExampleRaw, language: 'tsx' },
    },
  },
  render: () => <TagsInputMaxAndValidateExample />,
}

export const Events: Story = {
  parameters: {
    docs: {
      source: { code: EventsExampleRaw, language: 'tsx' },
    },
  },
  render: () => <TagsInputEventsExample />,
}

export const Programmatic: Story = {
  parameters: {
    docs: {
      source: { code: ProgrammaticExampleRaw, language: 'tsx' },
    },
  },
  render: () => <TagsInputProgrammaticExample />,
}
