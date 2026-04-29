import type { PolymorphicProps } from '@ark-ui/vue'
import type { Theme, ThemeCrafts } from '@raxium/vue/providers'
import type { HTMLAttributes } from 'vue'

export interface SpinRenderProps extends Theme {
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
