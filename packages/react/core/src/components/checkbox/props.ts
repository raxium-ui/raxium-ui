import type {
  CheckboxGroupBaseProps,
  CheckboxRootBaseProps,
} from '@ark-ui/react/checkbox'
import type { ThemeCrafts, ThemeNoCrafts } from '@raxium/react/providers/theme'
import type { HTMLAttributes, ReactNode } from 'react'

type ClassName = HTMLAttributes<HTMLElement>['className']

export type CheckedState = boolean | 'indeterminate'
export type CheckboxValueType = string | number | symbol | bigint | null

export interface CheckboxProps
  extends Omit<CheckboxRootBaseProps, 'value'>, ThemeCrafts<'tvCheckbox'> {
  value?: CheckboxValueType
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

export interface CheckboxGroupProps<T extends CheckboxValueType = CheckboxValueType>
  extends Omit<CheckboxGroupBaseProps, 'value' | 'defaultValue' | 'onValueChange'>,
  ThemeNoCrafts {
  className?: ClassName
  value?: T[]
  defaultValue?: T[]
  onValueChange?: (value: T[]) => void
  children?: ReactNode
}
