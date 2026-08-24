import { useScrollAreaContext } from '@ark-ui/react/scroll-area'
import { ScrollAreaRoot } from './ScrollArea'
import { ScrollAreaCorner } from './ScrollAreaCorner'
import { ScrollAreaScrollbar } from './ScrollAreaScrollbar'
import { ScrollAreaViewport } from './ScrollAreaViewport'

export const ScrollArea = Object.assign(ScrollAreaRoot, {
  Viewport: ScrollAreaViewport,
  Scrollbar: ScrollAreaScrollbar,
  Corner: ScrollAreaCorner,
})

export { ScrollAreaCorner, ScrollAreaScrollbar, ScrollAreaViewport, useScrollAreaContext }
export type {
  ScrollAreaCornerProps,
  ScrollAreaProps,
  ScrollAreaScrollbarProps,
  ScrollAreaViewportProps,
} from './props'
