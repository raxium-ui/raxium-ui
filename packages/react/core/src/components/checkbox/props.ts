import type {
  CheckboxGroupBaseProps,
  CheckboxRootBaseProps,
} from '@ark-ui/react/checkbox'
import type { ThemeCrafts, ThemeNoCrafts } from '@raxium/react/providers/theme'
import type { HTMLAttributes, ReactNode } from 'react'

type ClassName = HTMLAttributes<HTMLElement>['className']

export type CheckedState = boolean | 'indeterminate'

export interface CheckboxProps extends CheckboxRootBaseProps, ThemeCrafts<'tvCheckbox'> {
  label?: ReactNode
  className?: ClassName
  /**
   * Replaces the default Check / Minus marks (still inside Ark Indicator).
   * For checked vs indeterminate, render a child that calls `useCheckboxContext()`.
   */
  indicator?: ReactNode
  ui?: {
    root?: ClassName
    control?: ClassName
    indicator?: ClassName
    label?: ClassName
  }
}

export interface CheckboxGroupProps extends CheckboxGroupBaseProps, ThemeNoCrafts {
  className?: ClassName
  children?: ReactNode
}
