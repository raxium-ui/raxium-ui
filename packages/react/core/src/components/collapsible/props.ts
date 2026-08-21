import type {
  CollapsibleContentBaseProps,
  CollapsibleRootBaseProps,
  CollapsibleTriggerBaseProps,
} from '@ark-ui/react/collapsible'
import type { ThemeCrafts, ThemeNoCrafts } from '@raxium/react/providers/theme'
import type { HTMLAttributes, ReactNode } from 'react'

type ClassName = HTMLAttributes<HTMLElement>['className']

export interface CollapsibleProps extends CollapsibleRootBaseProps, ThemeCrafts<'tvCollapsible'> {
  className?: ClassName
  children?: ReactNode
}

export interface CollapsibleContentProps extends CollapsibleContentBaseProps, ThemeNoCrafts {
  className?: ClassName
  children?: ReactNode
}

export interface CollapsibleTriggerProps extends CollapsibleTriggerBaseProps, ThemeNoCrafts {
  className?: ClassName
  /**
   * Trailing chevron. `false` hides it; any other node replaces the default icon
   * (still wrapped in Ark `Indicator`).
   */
  indicator?: boolean | ReactNode
  ui?: {
    root?: ClassName
    indicator?: ClassName
  }
  children?: ReactNode
}

export interface ReadMoreProps extends CollapsibleRootBaseProps, ThemeCrafts<'tvReadMore'> {
  className?: ClassName
  text?: {
    more?: string
    less?: string
  }
  ui?: {
    root?: ClassName
    trigger?: ClassName
    content?: ClassName
  }
  /**
   * Replaces the default more/less trigger. Use `useReadMoreContext()` for overflow
   * `show` / `text` / `className`, and `useCollapsibleContext()` for `open`.
   */
  trigger?: ReactNode
  children?: ReactNode
}

export interface ReadMoreContextValue {
  show: boolean
  text: {
    more: string
    less: string
  }
  className: string
}
