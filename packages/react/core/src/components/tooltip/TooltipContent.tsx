import type { CSSProperties } from 'react'
import type { TooltipContentProps } from './props'
import { ark } from '@ark-ui/react/factory'
import { Tooltip as ArkTooltip } from '@ark-ui/react/tooltip'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useTeleportedDepth } from '@raxium/react/hooks/useDepth'
import { useInheritedTheme } from '@raxium/react/hooks/useInheritedTheme'
import { ProvideStructuralComponentTheme } from '@raxium/react/hooks/useProvideComponentTheme'
import { useTeleportDetection } from '@raxium/react/hooks/useTeleportDetection'
import { useThemeAttrs } from '@raxium/react/hooks/useThemeAttrs'
import { cxc } from '@raxium/themes/utils'
import { forwardRef, useMemo } from 'react'
import { splitTooltipArrow } from './split-tooltip-arrow'

export const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ className, theme: propsTheme, ui, children, ...props }, ref) => {
    const { isTeleported, setElementRef } = useTeleportDetection()
    const depth = useTeleportedDepth({
      type: 'tooltip',
      active: isTeleported,
      fallbackZIndex: 'var(--z-tooltip, var(--z-index))',
    })
    const theme = useInheritedTheme(propsTheme)
    const crafts = useCraft(theme, 'tvTooltip')
    const themeAttrs = useThemeAttrs(theme)
    const { arrows, rest } = useMemo(() => splitTooltipArrow(children), [children])

    return (
      <ProvideStructuralComponentTheme theme={theme}>
        <ArkTooltip.Positioner
          ref={setElementRef}
          className={crafts.positioner(cxc(ui?.positioner))}
        >
          <ArkTooltip.Content
            ref={ref}
            className={crafts.content(cxc(ui?.content, className))}
            style={{ '--rui-z-index': isTeleported ? depth.zIndex : 'auto' } as CSSProperties}
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
          </ArkTooltip.Content>
        </ArkTooltip.Positioner>
      </ProvideStructuralComponentTheme>
    )
  },
)

TooltipContent.displayName = 'Tooltip.Content'
