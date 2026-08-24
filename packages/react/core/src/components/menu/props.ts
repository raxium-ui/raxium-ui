import type {
  MenuCheckboxItemBaseProps,
  MenuContentBaseProps,
  MenuItemBaseProps,
  MenuItemGroupBaseProps,
  MenuRadioItemBaseProps,
  MenuRadioItemGroupBaseProps,
  MenuRootBaseProps,
  MenuTriggerItemBaseProps,
} from '@ark-ui/react/menu'
import type { RadioGroupVariants } from '@raxium/themes/default'
import type { ThemeCrafts, ThemeNoCrafts } from '@raxium/react/providers/theme'
import type { HTMLAttributes, ReactNode } from 'react'

type ClassName = HTMLAttributes<HTMLElement>['className']

export interface MenuProps extends MenuRootBaseProps, ThemeCrafts<'tvMenu'> {
  className?: ClassName
  children?: ReactNode
}

export interface MenuCheckboxItemProps extends MenuCheckboxItemBaseProps, ThemeNoCrafts {
  className?: ClassName
  indicator?: ReactNode
  ui?: {
    root?: ClassName
    checkbox?: ClassName
  }
  children?: ReactNode
}

export interface MenuContentProps extends MenuContentBaseProps, ThemeNoCrafts {
  className?: ClassName
  ui?: {
    positioner?: ClassName
    content?: ClassName
    inner?: ClassName
  }
  children?: ReactNode
}

export interface MenuItemProps extends MenuItemBaseProps, ThemeNoCrafts {
  className?: ClassName
  children?: ReactNode
}

export interface MenuItemGroupProps extends MenuItemGroupBaseProps, ThemeNoCrafts {
  className?: ClassName
  label?: string
  ui?: {
    root?: ClassName
    label?: ClassName
    marker?: ClassName
  }
  children?: ReactNode
}

export interface MenuRadioItemProps extends MenuRadioItemBaseProps, ThemeNoCrafts {
  className?: ClassName
  variant?: RadioGroupVariants['variant']
  indicator?: ReactNode
  ui?: {
    root?: ClassName
    indicator?: ClassName
  }
  children?: ReactNode
}

export interface MenuRadioItemGroupProps extends MenuRadioItemGroupBaseProps, ThemeNoCrafts {
  className?: ClassName
  children?: ReactNode
}

export interface MenuTriggerItemProps extends MenuTriggerItemBaseProps, ThemeNoCrafts {
  className?: ClassName
  children?: ReactNode
}
