import type { PolymorphicProps } from '@ark-ui/vue'
import type { ResolvedTheme, ThemeCrafts } from '@raxium/vue/providers'
import type { HTMLAttributes } from 'vue'

export interface SpinRenderProps {
  /** Merged theme from `useTheme` (tokens + crafts). */
  theme?: ResolvedTheme
  class?: HTMLAttributes['class']
  mode?: 'fullscreen' | 'inline'
}

export interface SpinProps extends PolymorphicProps, ThemeCrafts<'tvSpin'> {
  class?: HTMLAttributes['class']
  show?: boolean
  mode?: 'fullscreen' | 'inline'
  delay?: number
  ui?: {
    positioner?: HTMLAttributes['class']
    mask?: HTMLAttributes['class']
    indicator?: HTMLAttributes['class']
    text?: HTMLAttributes['class']
  }
}
