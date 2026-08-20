import type { Preview } from 'storybook-react-rsbuild'
import { RUIConfig } from '../core/src/providers/config'
import './style.css'

const preview: Preview = {
  parameters: {
    viewMode: 'docs',
    previewTabs: {
      'storybook/docs/panel': { index: 0 },
      'canvas': { index: 1 },
    },
    options: {
      storySort: {
        order: ['Providers', 'Components', 'Addons'],
        method: 'alphabetical',
      },
    },
    layout: 'padded',
    actions: { disable: true },
    controls: { disable: true },
    backgrounds: {
      options: {
        black: { name: 'Black', value: '#000000' },
        dark: { name: 'Dark', value: '#222222' },
        light: { name: 'Light', value: '#eeeeee' },
      },
    },
    viewport: { disable: true },
    docs: {
      codePanel: true,
    },
  },
  initialGlobals: {
    backgrounds: { value: 'dark' },
  },
  decorators: [
    Story => (
      <RUIConfig
        theme={{
          skin: 'razer',
          surface: 'dark',
        }}
      >
        <Story />
      </RUIConfig>
    ),
  ],
}

export default preview
