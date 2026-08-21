import type { ThemeCrafts } from '@raxium/react/providers/theme'
import type { ButtonVariants } from '@raxium/themes/default'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

export interface ButtonProps extends ThemeCrafts<'tvButton'>, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  variant?: ButtonVariants['variant']
  color?: ButtonVariants['color']
  tooltip?: string
  ripple?: boolean
  loading?: boolean
  asChild?: boolean
  /** Replaces the default spinner when `loading` is true. */
  loadingIndicator?: ReactNode
  ui?: {
    root?: string
    loading?: string
  }
}
