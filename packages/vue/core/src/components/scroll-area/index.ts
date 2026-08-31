import { withCompoundParts } from '../../utils/withCompoundParts'
import ScrollAreaRoot from './ScrollArea.vue'
import ScrollAreaCorner from './ScrollAreaCorner.vue'
import ScrollAreaScrollbar from './ScrollAreaScrollbar.vue'

export const ScrollArea = withCompoundParts(ScrollAreaRoot, {
  Scrollbar: ScrollAreaScrollbar,
  Corner: ScrollAreaCorner,
})

export { ScrollAreaCorner, ScrollAreaScrollbar }
export * from './props'
