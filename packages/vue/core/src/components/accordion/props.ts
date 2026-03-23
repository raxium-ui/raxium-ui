import type {
  AccordionItemBaseProps,
  AccordionItemContentBaseProps,
  AccordionItemTriggerBaseProps,
  AccordionRootBaseProps,
} from '@ark-ui/vue/accordion'
import type { ThemeCrafts, ThemeNoCrafts } from '@raxium/vue/providers'
import type { HTMLAttributes } from 'vue'

export interface AccordionProps extends AccordionRootBaseProps, ThemeCrafts<'tvAccordion'> {
  class?: HTMLAttributes['class']
}

export interface AccordionItemProps extends AccordionItemBaseProps, ThemeNoCrafts {
  class?: HTMLAttributes['class']
}

export interface AccordionTriggerProps extends AccordionItemTriggerBaseProps, ThemeNoCrafts {
  class?: HTMLAttributes['class']
  indicator?: boolean
  ui?: {
    root?: HTMLAttributes['class']
    indicator?: HTMLAttributes['class']
  }
}

export interface AccordionContentProps extends AccordionItemContentBaseProps, ThemeNoCrafts {
  class?: HTMLAttributes['class']
}
