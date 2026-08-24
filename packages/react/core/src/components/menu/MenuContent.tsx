import type { CSSProperties } from 'react'
import type { MenuContentProps } from './props'
import { ark } from '@ark-ui/react/factory'
import { Menu as ArkMenu } from '@ark-ui/react/menu'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useTeleportedDepthOwner } from '@raxium/react/hooks/useDepth'
import { useInheritedTheme } from '@raxium/react/hooks/useInheritedTheme'
import { ProvideStructuralComponentTheme } from '@raxium/react/hooks/useProvideComponentTheme'
import { useTeleportDetection } from '@raxium/react/hooks/useTeleportDetection'
import { useThemeAttrs } from '@raxium/react/hooks/useThemeAttrs'
import { cn, cxc } from '@raxium/themes/utils'
import { forwardRef, useMemo } from 'react'
import { splitMenuArrow } from './split-menu-arrow'

export const MenuContent = forwardRef<HTMLDivElement, MenuContentProps>(
  ({ className, theme: propsTheme, ui, children, ...props }, ref) => {
    const { isTeleported, setElementRef } = useTeleportDetection()
    const depth = useTeleportedDepthOwner({
      type: 'menu',
      active: isTeleported,
      fallbackZIndex: 'var(--z-dropdown, var(--z-index))',
    })
    const theme = useInheritedTheme(propsTheme)
    const crafts = useCraft(theme, 'tvMenu')
    const themeAttrs = useThemeAttrs(theme)
    const { arrows, rest } = useMemo(() => splitMenuArrow(children), [children])

    return (
      <ProvideStructuralComponentTheme theme={theme}>
        <ArkMenu.Positioner
          ref={setElementRef}
          className={cn(ui?.positioner)}
          style={{ '--rui-z-index': isTeleported ? depth.zIndex : 'auto' } as CSSProperties}
        >
          <ArkMenu.Content
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
          </ArkMenu.Content>
        </ArkMenu.Positioner>
      </ProvideStructuralComponentTheme>
    )
  },
)

MenuContent.displayName = 'Menu.Content'
