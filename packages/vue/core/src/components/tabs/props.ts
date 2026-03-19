import type { TabContentBaseProps, TabIndicatorBaseProps, TabListBaseProps, TabsRootBaseProps, TabTriggerBaseProps } from '@ark-ui/vue'
import type { ThemeCrafts, ThemeNoCrafts } from '@raxium/vue/providers'
import type { HTMLAttributes } from 'vue'

export interface TabsProps extends TabsRootBaseProps, ThemeCrafts<'tvTabs'> {
  class?: HTMLAttributes['class']
}
export interface TabsContentProps extends TabContentBaseProps, ThemeNoCrafts {
  class?: HTMLAttributes['class']
}
export interface TabsIndicatorProps extends TabIndicatorBaseProps, ThemeNoCrafts {
  class?: HTMLAttributes['class']
}
export interface TabsListProps extends TabListBaseProps, ThemeNoCrafts {
  class?: HTMLAttributes['class']
}
export interface TabsTriggerProps extends TabTriggerBaseProps, ThemeNoCrafts {
  class?: HTMLAttributes['class']
}
