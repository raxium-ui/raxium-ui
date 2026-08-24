import { useTabsContext } from '@ark-ui/react/tabs'
import { TabsRoot } from './Tabs'
import { TabsContent } from './TabsContent'
import { TabsIndicator } from './TabsIndicator'
import { TabsList } from './TabsList'
import { TabsTrigger } from './TabsTrigger'

export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
  Indicator: TabsIndicator,
})

export { TabsContent, TabsIndicator, TabsList, TabsTrigger, useTabsContext }
export type {
  TabsContentProps,
  TabsIndicatorProps,
  TabsListProps,
  TabsProps,
  TabsTriggerProps,
} from './props'
