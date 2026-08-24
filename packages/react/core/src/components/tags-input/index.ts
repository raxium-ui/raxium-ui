import { TagsInputItemDeleteTrigger, useTagsInputContext, useTagsInputItemContext } from '@ark-ui/react/tags-input'
import { TagsInputRoot } from './TagsInput'
import { TagsInputItem } from './TagsInputItem'

export const TagsInput = Object.assign(TagsInputRoot, {
  Item: TagsInputItem,
  ItemDeleteTrigger: TagsInputItemDeleteTrigger,
})

export {
  TagsInputItem,
  TagsInputItemDeleteTrigger,
  useTagsInputContext,
  useTagsInputItemContext,
}

export type { TagsInputItemProps, TagsInputProps } from './props'
