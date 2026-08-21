import type { Meta, StoryObj } from 'storybook-react-rsbuild'
import { Accordion } from '.'
import { AccordionBasicExample } from './examples/basic'
import BasicExampleRaw from './examples/basic.tsx?raw'
import { AccordionIndicatorExample } from './examples/indicator'
import IndicatorExampleRaw from './examples/indicator.tsx?raw'
import { AccordionSizesExample } from './examples/sizes'
import SizesExampleRaw from './examples/sizes.tsx?raw'
import { AccordionStatesExample } from './examples/states'
import StatesExampleRaw from './examples/states.tsx?raw'

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  parameters: {
    docs: {
      source: { code: BasicExampleRaw, language: 'tsx' },
    },
  },
  render: () => <AccordionBasicExample />,
}

export const States: Story = {
  parameters: {
    docs: {
      source: { code: StatesExampleRaw, language: 'tsx' },
    },
  },
  render: () => <AccordionStatesExample />,
}

export const Sizes: Story = {
  parameters: {
    docs: {
      source: { code: SizesExampleRaw, language: 'tsx' },
    },
  },
  render: () => <AccordionSizesExample />,
}

export const Indicator: Story = {
  parameters: {
    docs: {
      source: { code: IndicatorExampleRaw, language: 'tsx' },
    },
  },
  render: () => <AccordionIndicatorExample />,
}

export const Theme: Story = {
  render: () => (
    <div className="w-full flex flex-col gap-4">
      <Accordion
        id="accordion-theme-sm"
        className="w-full flex flex-col gap-2"
        theme={{ size: 'sm' }}
        collapsible
      >
        <Accordion.Item value="sm">
          <Accordion.Trigger>
            <span className="text-rz-green">Small size trigger</span>
          </Accordion.Trigger>
          <Accordion.Content className="mt-2">
            <p className="text-sm text-gray-cc">Small size content</p>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
      <Accordion
        id="accordion-theme-lg"
        className="w-full flex flex-col gap-2"
        theme={{ size: 'lg' }}
        collapsible
      >
        <Accordion.Item value="lg">
          <Accordion.Trigger>
            <span className="text-rz-green">Large size trigger</span>
          </Accordion.Trigger>
          <Accordion.Content className="mt-2">
            <p className="text-sm text-gray-cc">Large size content</p>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  ),
}

export const ClassNames: Story = {
  render: () => (
    <Accordion id="accordion-ui-example" className="w-full flex flex-col gap-2" collapsible>
      <Accordion.Item value="ui">
        <Accordion.Trigger ui={{ root: 'text-rz-green', indicator: 'bg-rz-blue' }}>
          Trigger with custom indicator style
        </Accordion.Trigger>
        <Accordion.Content className="mt-2">
          <p className="text-sm text-gray-cc">Accordion content</p>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
}
