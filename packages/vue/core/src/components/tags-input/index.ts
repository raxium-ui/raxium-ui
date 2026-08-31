import { TagsInputItemDeleteTrigger } from '@ark-ui/vue/tags-input'
import { withCompoundParts } from '../../utils/withCompoundParts'
import TagsInputRoot from './TagsInput.vue'
import TagsInputItem from './TagsInputItem.vue'

export const TagsInput = withCompoundParts(TagsInputRoot, {
  Item: TagsInputItem,
  ItemDeleteTrigger: TagsInputItemDeleteTrigger,
})

export { TagsInputItem, TagsInputItemDeleteTrigger }
export * from './props'
