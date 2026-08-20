import type { Meta, StoryObj } from 'storybook-react-rsbuild'
import { useTheme } from '@raxium/react/hooks/useTheme'
import { RUIConfig, ThemeProvider } from '../index'

function ThemeProbe() {
  const theme = useTheme()
  return (
    <pre className="text-sm text-gray-ff">
      {JSON.stringify(
        {
          skin: theme.skin,
          surface: theme.surface,
          size: theme.size,
          bordered: theme.bordered,
          unstyled: theme.unstyled,
        },
        null,
        2,
      )}
    </pre>
  )
}

const meta = {
  title: 'Providers/RUIConfig',
  component: RUIConfig,
} satisfies Meta<typeof RUIConfig>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <RUIConfig theme={{ skin: 'razer', surface: 'dark', size: 'base', bordered: true }}>
      <ThemeProvider value={{ size: 'lg' }}>
        <ThemeProbe />
      </ThemeProvider>
    </RUIConfig>
  ),
}
