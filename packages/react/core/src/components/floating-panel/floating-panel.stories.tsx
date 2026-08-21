import type { Meta, StoryObj } from 'storybook-react-rsbuild'
import { FloatingPanel } from '.'
import { FloatingPanelBasicExample } from './examples/basic'
import BasicExampleRaw from './examples/basic.tsx?raw'
import { FloatingPanelInitialStateExample } from './examples/initial-state'
import InitialStateExampleRaw from './examples/initial-state.tsx?raw'
import { FloatingPanelMinSizeExample } from './examples/min-size'
import MinSizeExampleRaw from './examples/min-size.tsx?raw'
import { FloatingPanelMinimalExample } from './examples/minimal'
import MinimalExampleRaw from './examples/minimal.tsx?raw'
import { FloatingPanelMultipleExample } from './examples/multiple'
import MultipleExampleRaw from './examples/multiple.tsx?raw'
import { FloatingPanelResizeAxisExample } from './examples/resize-axis'
import ResizeAxisExampleRaw from './examples/resize-axis.tsx?raw'
import { FloatingPanelWithDialogExample } from './examples/with-dialog'
import WithDialogExampleRaw from './examples/with-dialog.tsx?raw'

const meta = {
  title: 'Components/FloatingPanel',
  component: FloatingPanel,
} satisfies Meta<typeof FloatingPanel>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  parameters: { docs: { source: { code: BasicExampleRaw, language: 'tsx' } } },
  render: () => <FloatingPanelBasicExample />,
}

export const Minimal: Story = {
  parameters: { docs: { source: { code: MinimalExampleRaw, language: 'tsx' } } },
  render: () => <FloatingPanelMinimalExample />,
}

export const ResizeAxis: Story = {
  parameters: { docs: { source: { code: ResizeAxisExampleRaw, language: 'tsx' } } },
  render: () => <FloatingPanelResizeAxisExample />,
}

export const MinSize: Story = {
  parameters: { docs: { source: { code: MinSizeExampleRaw, language: 'tsx' } } },
  render: () => <FloatingPanelMinSizeExample />,
}

export const InitialState: Story = {
  parameters: { docs: { source: { code: InitialStateExampleRaw, language: 'tsx' } } },
  render: () => <FloatingPanelInitialStateExample />,
}

export const Multiple: Story = {
  parameters: { docs: { source: { code: MultipleExampleRaw, language: 'tsx' } } },
  render: () => <FloatingPanelMultipleExample />,
}

export const WithDialog: Story = {
  parameters: { docs: { source: { code: WithDialogExampleRaw, language: 'tsx' } } },
  render: () => <FloatingPanelWithDialogExample />,
}
