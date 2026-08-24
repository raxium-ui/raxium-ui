import type {
  TabContentBaseProps,
  TabIndicatorBaseProps,
  TabListBaseProps,
  TabsRootBaseProps,
  TabTriggerBaseProps,
} from '@ark-ui/react/tabs'
import type { ThemeCrafts, ThemeNoCrafts } from '@raxium/react/providers/theme'
import type { HTMLAttributes, ReactNode } from 'react'

type ClassName = HTMLAttributes<HTMLElement>['className']

export interface TabsProps extends TabsRootBaseProps, ThemeCrafts<'tvTabs'> {
  className?: ClassName
  children?: ReactNode
}

export interface TabsListProps extends TabListBaseProps, ThemeNoCrafts {
  className?: ClassName
  children?: ReactNode
}

export interface TabsTriggerProps extends TabTriggerBaseProps, ThemeNoCrafts {
  className?: ClassName
  children?: ReactNode
}

export interface TabsIndicatorProps extends TabIndicatorBaseProps, ThemeNoCrafts {
  className?: ClassName
  children?: ReactNode
}

export interface TabsContentProps extends TabContentBaseProps, ThemeNoCrafts {
  className?: ClassName
  children?: ReactNode
}
