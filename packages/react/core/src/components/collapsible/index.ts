import { useCollapsibleContext } from '@ark-ui/react/collapsible'
import { CollapsibleRoot } from './Collapsible'
import { CollapsibleContent } from './CollapsibleContent'
import { CollapsibleTrigger } from './CollapsibleTrigger'
import { ReadMore, useReadMoreContext } from './ReadMore'

export const Collapsible = Object.assign(CollapsibleRoot, {
  Trigger: CollapsibleTrigger,
  Content: CollapsibleContent,
})

export {
  CollapsibleContent,
  CollapsibleTrigger,
  ReadMore,
  useCollapsibleContext,
  useReadMoreContext,
}
export type {
  CollapsibleContentProps,
  CollapsibleProps,
  CollapsibleTriggerProps,
  ReadMoreContextValue,
  ReadMoreProps,
} from './props'
