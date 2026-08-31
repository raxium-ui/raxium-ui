import { withCompoundParts } from '../../utils/withCompoundParts'
import TabsRoot from './Tabs.vue'
import TabsContent from './TabsContent.vue'
import TabsIndicator from './TabsIndicator.vue'
import TabsList from './TabsList.vue'
import TabsTrigger from './TabsTrigger.vue'

export const Tabs = withCompoundParts(TabsRoot, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
  Indicator: TabsIndicator,
})

export { TabsContent, TabsIndicator, TabsList, TabsTrigger }
export * from './props'
