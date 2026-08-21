import type { CSSProperties } from 'react'
import type { HoverCardContentProps } from './props'
import { ark } from '@ark-ui/react/factory'
import { HoverCard as ArkHoverCard } from '@ark-ui/react/hover-card'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useTeleportedDepthOwner } from '@raxium/react/hooks/useDepth'
import { useInheritedTheme } from '@raxium/react/hooks/useInheritedTheme'
import { ProvideStructuralComponentTheme } from '@raxium/react/hooks/useProvideComponentTheme'
import { useTeleportDetection } from '@raxium/react/hooks/useTeleportDetection'
import { useThemeAttrs } from '@raxium/react/hooks/useThemeAttrs'
import { cn, cxc } from '@raxium/themes/utils'
import { forwardRef, useMemo } from 'react'
import { splitHoverCardArrow } from './split-hover-card-arrow'

export const HoverCardContent = forwardRef<HTMLDivElement, HoverCardContentProps>(
  ({ className, theme: propsTheme, ui, children, ...props }, ref) => {
    const { isTeleported, setElementRef } = useTeleportDetection()
    const depth = useTeleportedDepthOwner({
      type: 'hover-card',
      active: isTeleported,
      fallbackZIndex: 'var(--z-popover, var(--z-index))',
    })
    const theme = useInheritedTheme(propsTheme)
    const crafts = useCraft(theme, 'tvHoverCard')
    const themeAttrs = useThemeAttrs(theme)
    const { arrows, rest } = useMemo(() => splitHoverCardArrow(children), [children])

    return (
      <ProvideStructuralComponentTheme theme={theme}>
        <ArkHoverCard.Positioner
          ref={setElementRef}
          className={cn(ui?.positioner)}
          style={{ '--rui-z-index': isTeleported ? depth.zIndex : 'auto' } as CSSProperties}
        >
          <ArkHoverCard.Content
            ref={ref}
            className={crafts.content(cxc(ui?.content, className))}
            {...props}
            {...themeAttrs}
          >
            {arrows}
            <ark.div
              className={crafts.contentInner(cxc(ui?.inner))}
              {...themeAttrs}
            >
              {rest}
            </ark.div>
          </ArkHoverCard.Content>
        </ArkHoverCard.Positioner>
      </ProvideStructuralComponentTheme>
    )
  },
)

HoverCardContent.displayName = 'HoverCard.Content'
