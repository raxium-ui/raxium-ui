import type { SwitchRootBaseProps } from '@ark-ui/vue'
import type { ThemeCrafts, ThemeNoCrafts } from '@raxium/vue/providers'
import type { HTMLAttributes } from 'vue'

export interface SwitchProps extends SwitchRootBaseProps, ThemeCrafts<'tvSwitch'> {
  class?: HTMLAttributes['class']
  ui?: {
    root?: HTMLAttributes['class']
    control?: HTMLAttributes['class']
    thumb?: HTMLAttributes['class']
    label?: HTMLAttributes['class']
  }
}

export interface SwitchLabelProps extends ThemeNoCrafts {
  class?: HTMLAttributes['class']
  asChild?: boolean
}
