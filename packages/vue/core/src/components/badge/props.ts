import type { BadgeVariants } from '@raxium/themes/default'
import type { ThemeCrafts } from '@raxium/vue/providers'
import type { HTMLAttributes } from 'vue'

export interface BadgeProps extends ThemeCrafts<'tvBadge'> {
  class?: HTMLAttributes['class']
  variant?: BadgeVariants['variant']
  as?: 'div' | 'sup'
  asChild?: boolean
}
