import type { Meta, StoryObj } from 'storybook-react-rsbuild'
import { Dialog } from '.'
import { DialogBasicExample } from './examples/basic'
import BasicExampleRaw from './examples/basic.tsx?raw'
import { DialogBeforeCloseExample } from './examples/before-close'
import BeforeCloseExampleRaw from './examples/before-close.tsx?raw'
import { DialogContentCloseExample } from './examples/content-close'
import ContentCloseExampleRaw from './examples/content-close.tsx?raw'
import { DialogControlledAndEventsExample } from './examples/controlled-and-events'
import ControlledAndEventsExampleRaw from './examples/controlled-and-events.tsx?raw'
import { DialogFooterWidgetExample } from './examples/footer-widget'
import FooterWidgetExampleRaw from './examples/footer-widget.tsx?raw'
import { DialogFunctionalExample } from './examples/functional'
import FunctionalExampleRaw from './examples/functional.tsx?raw'
import { DialogScrollableExample } from './examples/scrollable'
import ScrollableExampleRaw from './examples/scrollable.tsx?raw'
import { DialogStackedExample } from './examples/stacked'
import StackedExampleRaw from './examples/stacked.tsx?raw'
import { DialogStackedFunctionalExample } from './examples/stacked-functional'
import StackedFunctionalExampleRaw from './examples/stacked-functional.tsx?raw'
import { DialogVariantsExample } from './examples/variants'
import VariantsExampleRaw from './examples/variants.tsx?raw'

const meta = {
  title: 'Components/Dialog',
  component: Dialog,
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  parameters: { docs: { source: { code: BasicExampleRaw, language: 'tsx' } } },
  render: () => <DialogBasicExample />,
}

export const ControlledAndEvents: Story = {
  parameters: { docs: { source: { code: ControlledAndEventsExampleRaw, language: 'tsx' } } },
  render: () => <DialogControlledAndEventsExample />,
}

export const BeforeClose: Story = {
  parameters: { docs: { source: { code: BeforeCloseExampleRaw, language: 'tsx' } } },
  render: () => <DialogBeforeCloseExample />,
}

export const Variants: Story = {
  parameters: { docs: { source: { code: VariantsExampleRaw, language: 'tsx' } } },
  render: () => <DialogVariantsExample />,
}

export const Scrollable: Story = {
  parameters: { docs: { source: { code: ScrollableExampleRaw, language: 'tsx' } } },
  render: () => <DialogScrollableExample />,
}

export const ContentClose: Story = {
  parameters: { docs: { source: { code: ContentCloseExampleRaw, language: 'tsx' } } },
  render: () => <DialogContentCloseExample />,
}

export const FooterWidget: Story = {
  parameters: { docs: { source: { code: FooterWidgetExampleRaw, language: 'tsx' } } },
  render: () => <DialogFooterWidgetExample />,
}

export const Functional: Story = {
  parameters: { docs: { source: { code: FunctionalExampleRaw, language: 'tsx' } } },
  render: () => <DialogFunctionalExample />,
}

export const Stacked: Story = {
  parameters: { docs: { source: { code: StackedExampleRaw, language: 'tsx' } } },
  render: () => <DialogStackedExample />,
}

export const StackedFunctional: Story = {
  parameters: { docs: { source: { code: StackedFunctionalExampleRaw, language: 'tsx' } } },
  render: () => <DialogStackedFunctionalExample />,
}
