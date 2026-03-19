import type {
  CollapsibleContentBaseProps,
  CollapsibleRootBaseProps,
  CollapsibleTriggerBaseProps,
} from '@ark-ui/vue'
import type { ThemeCrafts, ThemeNoCrafts } from '@raxium/vue/providers'
import type { HTMLAttributes } from 'vue'

export interface CollapsibleProps extends CollapsibleRootBaseProps, ThemeCrafts<'tvCollapsible'> {
  class?: HTMLAttributes['class']
}
export interface CollapsibleContentProps extends CollapsibleContentBaseProps, ThemeNoCrafts {
  class?: string
}

export interface CollapsibleTriggerProps extends CollapsibleTriggerBaseProps, ThemeNoCrafts {
  class?: HTMLAttributes['class']
  indicator?: boolean
  ui?: {
    root?: HTMLAttributes['class']
    indicator?: HTMLAttributes['class']
  }
}

export interface ReadMoreProps extends CollapsibleProps {
  text?: {
    more?: string
    less?: string
  }
  ui?: {
    root?: string
    trigger?: string
    content?: string
  }
}
