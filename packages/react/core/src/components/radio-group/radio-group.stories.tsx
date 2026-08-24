import type { Meta, StoryObj } from 'storybook-react-rsbuild'
import { RadioGroup } from '.'
import { RadioGroupBasicExample } from './examples/basic'
import BasicExampleRaw from './examples/basic.tsx?raw'

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  parameters: { docs: { source: { code: BasicExampleRaw, language: 'tsx' } } },
  render: () => <RadioGroupBasicExample />,
}
