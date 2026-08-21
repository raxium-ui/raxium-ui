import type { Meta, StoryObj } from 'storybook-react-rsbuild'
import { Collapsible, ReadMore as ReadMoreComponent } from '.'
import { CollapsibleBasicExample } from './examples/basic'
import BasicExampleRaw from './examples/basic.tsx?raw'
import { CollapsibleIndicatorExample } from './examples/indicator'
import IndicatorExampleRaw from './examples/indicator.tsx?raw'
import { CollapsibleReadMoreExample } from './examples/read-more'
import ReadMoreExampleRaw from './examples/read-more.tsx?raw'
import { CollapsibleSizesExample } from './examples/sizes'
import SizesExampleRaw from './examples/sizes.tsx?raw'
import { CollapsibleStatesExample } from './examples/states'
import StatesExampleRaw from './examples/states.tsx?raw'

const meta = {
  title: 'Components/Collapsible',
  component: Collapsible,
} satisfies Meta<typeof Collapsible>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  parameters: {
    docs: {
      source: { code: BasicExampleRaw, language: 'tsx' },
    },
  },
  render: () => <CollapsibleBasicExample />,
}

export const States: Story = {
  parameters: {
    docs: {
      source: { code: StatesExampleRaw, language: 'tsx' },
    },
  },
  render: () => <CollapsibleStatesExample />,
}

export const Sizes: Story = {
  parameters: {
    docs: {
      source: { code: SizesExampleRaw, language: 'tsx' },
    },
  },
  render: () => <CollapsibleSizesExample />,
}

export const Indicator: Story = {
  parameters: {
    docs: {
      source: { code: IndicatorExampleRaw, language: 'tsx' },
    },
  },
  render: () => <CollapsibleIndicatorExample />,
}

export const ReadMore: Story = {
  parameters: {
    docs: {
      source: { code: ReadMoreExampleRaw, language: 'tsx' },
    },
  },
  render: () => <CollapsibleReadMoreExample />,
}

export const Theme: Story = {
  render: () => (
    <div className="w-full flex flex-col gap-4">
      <Collapsible id="theme-example-small" className="w-full" theme={{ size: 'sm' }}>
        <Collapsible.Trigger>
          <span className="text-blue-500">Small size trigger</span>
        </Collapsible.Trigger>
        <Collapsible.Content className="mt-2">
          <p className="text-sm text-slate-400">Small size content</p>
        </Collapsible.Content>
      </Collapsible>
      <Collapsible id="theme-example-large" className="w-full" theme={{ size: 'lg' }}>
        <Collapsible.Trigger>
          <span className="text-blue-500">Large size trigger</span>
        </Collapsible.Trigger>
        <Collapsible.Content className="mt-2">
          <p className="text-sm text-slate-400">Large size content</p>
        </Collapsible.Content>
      </Collapsible>
    </div>
  ),
}

export const UI: Story = {
  render: () => {
    const longText = 'This is a long content for ReadMore UI customization demo. '.repeat(10)
    return (
      <div className="w-full flex flex-col gap-4">
        <Collapsible id="ui-example-collapsible" className="w-full">
          <Collapsible.Trigger ui={{ root: 'text-blue-500', indicator: 'text-blue-500' }}>
            Trigger with custom indicator style
          </Collapsible.Trigger>
          <Collapsible.Content className="mt-2">
            <p className="text-sm text-slate-400">Collapsible content</p>
          </Collapsible.Content>
        </Collapsible>
        <ReadMoreComponent
          collapsedHeight={60}
          id="ui-example-read-more"
          ui={{
            root: 'border border-slate-300 p-3 rounded-md',
            trigger: 'text-blue-500',
            content: 'text-slate-400',
          }}
        >
          <p className="text-sm">{longText}</p>
        </ReadMoreComponent>
      </div>
    )
  },
}
