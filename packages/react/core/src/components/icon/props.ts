import type { IconifyIcon, IconifyIconProps } from '@iconify/react'
import type { ThemeCrafts, ThemeProps } from '@raxium/react/providers/theme'

export type { IconifyIcon }

export interface IconProps extends Omit<IconifyIconProps, 'icon'>, Omit<ThemeCrafts<'tvIcon'>, 'theme'> {
  icon: string | IconifyIcon
  className?: string
  /** Tokens without `size`; icon size follows `1lh` / `className`. */
  theme?: Omit<ThemeProps, 'size'>
}
