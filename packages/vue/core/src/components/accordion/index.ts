import { withCompoundParts } from '../../utils/withCompoundParts'
import AccordionRoot from './Accordion.vue'
import AccordionContent from './AccordionContent.vue'
import AccordionItem from './AccordionItem.vue'
import AccordionTrigger from './AccordionTrigger.vue'

export const Accordion: typeof AccordionRoot & {
  Item: typeof AccordionItem
  Panel: typeof AccordionItem
  Trigger: typeof AccordionTrigger
  Content: typeof AccordionContent
} = withCompoundParts(AccordionRoot, {
  Item: AccordionItem,
  Panel: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
})

export { AccordionContent, AccordionItem, AccordionTrigger }
export { AccordionItem as AccordionPanel }
export * from './props'
