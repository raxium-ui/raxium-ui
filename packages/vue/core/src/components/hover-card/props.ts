import type { HoverCardContentBaseProps, HoverCardRootBaseProps } from '@ark-ui/vue'
import type { ThemeCrafts, ThemeNoCrafts } from '@raxium/vue/providers'
import type { HTMLAttributes } from 'vue'

/**
 * @description Imagine HoverCard is a interactive Tooltip.
 */
export interface HoverCardProps extends HoverCardRootBaseProps, ThemeCrafts<'tvHoverCard'> {}

export interface HoverCardContentProps extends HoverCardContentBaseProps, ThemeNoCrafts {
  class?: HTMLAttributes['class']
  ui?: {
    positioner?: HTMLAttributes['class']
    content?: HTMLAttributes['class']
    inner?: HTMLAttributes['class']
  }
}
