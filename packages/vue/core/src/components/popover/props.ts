import type { PopoverContentBaseProps, PopoverRootBaseProps } from '@ark-ui/vue'
import type { ThemeCrafts, ThemeNoCrafts } from '@raxium/vue/providers'
import type { HTMLAttributes } from 'vue'

export interface PopoverProps extends PopoverRootBaseProps, ThemeCrafts<'tvPopover'> {}
export interface PopoverCloseProps extends ThemeNoCrafts {
  class?: HTMLAttributes['class']
  asChild?: boolean
}
export interface PopoverContentProps extends PopoverContentBaseProps, ThemeNoCrafts {
  class?: HTMLAttributes['class']
  ui?: {
    positioner?: HTMLAttributes['class']
    content?: HTMLAttributes['class']
    inner?: HTMLAttributes['class']
  }
}
export interface PopoverIndicatorProps extends ThemeNoCrafts {
  class?: HTMLAttributes['class']
  asChild?: boolean
}
