import type { TooltipContentBaseProps, TooltipRootBaseProps } from '@ark-ui/vue'
import type { ThemeCrafts, ThemeNoCrafts } from '@raxium/vue/providers'
import type { HTMLAttributes } from 'vue'

export interface TooltipProps extends TooltipRootBaseProps, ThemeCrafts<'tvTooltip'> {}
export interface TooltipContentProps extends TooltipContentBaseProps, ThemeNoCrafts {
  class?: HTMLAttributes['class']
  ui?: {
    positioner?: HTMLAttributes['class']
    content?: HTMLAttributes['class']
    inner?: HTMLAttributes['class']
  }
}
