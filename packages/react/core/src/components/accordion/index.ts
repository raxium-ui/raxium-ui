import { useAccordionItemContext } from '@ark-ui/react/accordion'
import { AccordionRoot } from './Accordion'
import { AccordionContent } from './AccordionContent'
import { AccordionItem } from './AccordionItem'
import { AccordionTrigger } from './AccordionTrigger'

export const Accordion = Object.assign(AccordionRoot, {
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
})

export { AccordionContent, AccordionItem, AccordionTrigger, useAccordionItemContext }
export type {
  AccordionContentProps,
  AccordionItemProps,
  AccordionProps,
  AccordionTriggerProps,
} from './props'
