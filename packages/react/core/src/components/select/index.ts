import {
  createListCollection,
  useSelectContext,
  useSelectItemContext,
} from '@ark-ui/react/select'
import { SelectRoot } from './Select'
import { SelectContent } from './SelectContent'
import { SelectItem } from './SelectItem'
import { SelectItemGroup } from './SelectItemGroup'
import { SelectTrigger } from './SelectTrigger'
import { SelectValue } from './SelectValue'

export const Select = Object.assign(SelectRoot, {
  Trigger: SelectTrigger,
  Value: SelectValue,
  Content: SelectContent,
  Item: SelectItem,
  ItemGroup: SelectItemGroup,
})

export {
  createListCollection,
  SelectContent,
  SelectItem,
  SelectItemGroup,
  SelectTrigger,
  SelectValue,
  useSelectContext,
  useSelectItemContext,
}

export type {
  SelectContentProps,
  SelectItemGroupProps,
  SelectItemProps,
  SelectProps,
  SelectTriggerProps,
  SelectValueProps,
} from './props'
