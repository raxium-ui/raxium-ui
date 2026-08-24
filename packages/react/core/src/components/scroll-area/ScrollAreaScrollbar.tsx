import type { ScrollAreaScrollbarProps } from './props'
import { ScrollArea as ArkScrollArea } from '@ark-ui/react/scroll-area'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useInheritedTheme } from '@raxium/react/hooks/useInheritedTheme'
import { cxc } from '@raxium/themes/utils'
import { forwardRef, useMemo } from 'react'
import { useScrollAreaOverflow } from './overflow-context'

export const ScrollAreaScrollbar = forwardRef<HTMLDivElement, ScrollAreaScrollbarProps>(
  ({ className, theme: propsTheme, ui, orientation = 'vertical', ...props }, ref) => {
    const theme = useInheritedTheme(propsTheme)
    const variants = useMemo(() => ({ orientation }), [orientation])
    const crafts = useCraft(theme, 'tvScrollArea', variants)
    const overflow = useScrollAreaOverflow()

    let visible: boolean
    switch (orientation) {
      case 'horizontal':
        visible = overflow.horizontal
        break
      case 'vertical':
        visible = overflow.vertical
        break
      default: {
        const _exhaustive: never = orientation
        return _exhaustive
      }
    }

    if (!visible)
      return null

    return (
      <ArkScrollArea.Scrollbar
        ref={ref}
        orientation={orientation}
        className={crafts.scrollbar(cxc(ui?.root, className))}
        {...props}
      >
        <ArkScrollArea.Thumb className={crafts.thumb(cxc(ui?.thumb))} />
      </ArkScrollArea.Scrollbar>
    )
  },
)

ScrollAreaScrollbar.displayName = 'ScrollArea.Scrollbar'
