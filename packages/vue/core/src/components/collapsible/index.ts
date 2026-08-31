import { withCompoundParts } from '../../utils/withCompoundParts'
import CollapsibleRoot from './Collapsible.vue'
import CollapsibleContent from './CollapsibleContent.vue'
import CollapsibleTrigger from './CollapsibleTrigger.vue'
import ReadMore from './ReadMore.vue'

export const Collapsible = withCompoundParts(CollapsibleRoot, {
  Trigger: CollapsibleTrigger,
  Content: CollapsibleContent,
})

export { CollapsibleContent, CollapsibleTrigger, ReadMore }
export * from './props'
