import type {
  CollectionItem,
  SelectContentProps as ArkSelectContentProps,
  SelectItemBaseProps,
  SelectItemGroupBaseProps,
  SelectRootBaseProps,
  SelectTriggerBaseProps,
} from '@ark-ui/react/select'
import type { ThemeCrafts, ThemeNoCrafts } from '@raxium/react/providers/theme'
import type { HTMLAttributes, ReactNode } from 'react'

type ClassName = HTMLAttributes<HTMLElement>['className']

export interface SelectProps<T extends CollectionItem>
  extends SelectRootBaseProps<T>, ThemeCrafts<'tvSelect'> {
  className?: ClassName
  children?: ReactNode
}

export interface SelectContentProps extends ArkSelectContentProps, ThemeNoCrafts {
  className?: ClassName
  ui?: {
    positioner?: ClassName
    root?: ClassName
    inner?: ClassName
  }
  children?: ReactNode
}

export interface SelectItemProps extends SelectItemBaseProps, ThemeNoCrafts {
  className?: ClassName
  indicator?: ReactNode
  children?: ReactNode
}

export interface SelectItemGroupProps extends SelectItemGroupBaseProps, ThemeNoCrafts {
  className?: ClassName
  label?: ReactNode
  ui?: {
    root?: ClassName
    label?: ClassName
  }
  children?: ReactNode
}

export interface SelectTriggerProps extends SelectTriggerBaseProps, ThemeNoCrafts {
  className?: ClassName
  clearable?: boolean
  clearIcon?: ReactNode
  indicator?: ReactNode
  children?: ReactNode
}

export interface SelectValueProps extends ThemeNoCrafts {
  className?: ClassName
  placeholder?: string
  asChild?: boolean
  children?: ReactNode
}
