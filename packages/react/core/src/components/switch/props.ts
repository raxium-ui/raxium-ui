import type { SwitchRootBaseProps } from '@ark-ui/react/switch'
import type { ThemeCrafts, ThemeNoCrafts } from '@raxium/react/providers/theme'
import type { HTMLAttributes, ReactNode } from 'react'

type ClassName = HTMLAttributes<HTMLElement>['className']

export interface SwitchProps extends SwitchRootBaseProps, ThemeCrafts<'tvSwitch'> {
  className?: ClassName
  children?: ReactNode
  ui?: {
    root?: ClassName
    control?: ClassName
    thumb?: ClassName
    label?: ClassName
  }
}

export interface SwitchLabelProps extends ThemeNoCrafts {
  className?: ClassName
  asChild?: boolean
  children?: ReactNode
}
