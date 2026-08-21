import type {
  AccordionItemBaseProps,
  AccordionItemContentBaseProps,
  AccordionItemTriggerBaseProps,
  AccordionRootBaseProps,
} from '@ark-ui/react/accordion'
import type { ThemeCrafts, ThemeNoCrafts } from '@raxium/react/providers/theme'
import type { HTMLAttributes, ReactNode } from 'react'

type ClassName = HTMLAttributes<HTMLElement>['className']

export interface AccordionProps extends AccordionRootBaseProps, ThemeCrafts<'tvAccordion'> {
  className?: ClassName
  children?: ReactNode
}

export interface AccordionItemProps extends AccordionItemBaseProps, ThemeNoCrafts {
  className?: ClassName
  children?: ReactNode
}

export interface AccordionTriggerProps extends AccordionItemTriggerBaseProps, ThemeNoCrafts {
  className?: ClassName
  /**
   * Leading chevron. `false` hides it; any other node replaces the default icon
   * (still wrapped in Ark `ItemIndicator`).
   */
  indicator?: boolean | ReactNode
  ui?: {
    root?: ClassName
    indicator?: ClassName
  }
  children?: ReactNode
}

export interface AccordionContentProps extends AccordionItemContentBaseProps, ThemeNoCrafts {
  className?: ClassName
  children?: ReactNode
}
