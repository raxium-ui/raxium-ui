import type { ResolvedTheme, ThemeCrafts } from '@raxium/react/providers/theme'
import type { HTMLAttributes, ReactNode } from 'react'

type ClassName = HTMLAttributes<HTMLElement>['className']

export interface SpinRenderProps {
  theme?: ResolvedTheme
  className?: ClassName
  mode?: 'fullscreen' | 'inline'
}

export interface SpinProps extends ThemeCrafts<'tvSpin'> {
  className?: ClassName
  show?: boolean
  mode?: 'fullscreen' | 'inline'
  delay?: number
  icon?: ReactNode
  children?: ReactNode
  ui?: {
    positioner?: ClassName
    mask?: ClassName
    indicator?: ClassName
    text?: ClassName
  }
}

export interface SpinProviderProps {
  children?: ReactNode
  icon?: ReactNode | ((props: SpinRenderProps) => ReactNode)
}
