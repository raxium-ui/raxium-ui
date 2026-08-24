import type {
  RadioGroupItemBaseProps,
  RadioGroupRootBaseProps,
} from '@ark-ui/react/radio-group'
import type { ThemeCrafts, ThemeNoCrafts } from '@raxium/react/providers/theme'
import type { RadioGroupVariants } from '@raxium/themes/default'
import type { HTMLAttributes, ReactNode } from 'react'

type ClassName = HTMLAttributes<HTMLElement>['className']

export interface RadioGroupProps extends RadioGroupRootBaseProps, ThemeCrafts<'tvRadioGroup'> {
  className?: ClassName
  label?: ReactNode
  children?: ReactNode
  ui?: {
    root?: ClassName
    label?: ClassName
  }
}

export interface RadioGroupItemProps extends RadioGroupItemBaseProps, ThemeNoCrafts {
  className?: ClassName
  text?: ReactNode
  variant?: RadioGroupVariants['variant']
  /** Replaces default Circle / Check. Use `useRadioGroupItemContext` for checked state. */
  indicator?: ReactNode
  children?: ReactNode
  ui?: {
    root?: ClassName
    control?: ClassName
    indicator?: ClassName
    text?: ClassName
  }
}

export interface RadioGroupLayoutProps {
  className?: ClassName
  layout?: 'stack' | 'inline'
  children?: ReactNode
}
