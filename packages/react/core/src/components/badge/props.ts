import type { ThemeCrafts } from '@raxium/react/providers/theme'
import type { BadgeVariants } from '@raxium/themes/default'
import type { HTMLAttributes, ReactNode } from 'react'

export interface BadgeProps extends ThemeCrafts<'tvBadge'>, Omit<HTMLAttributes<HTMLElement>, 'color'> {
  variant?: BadgeVariants['variant']
  as?: 'div' | 'sup'
  asChild?: boolean
  children?: ReactNode
}
