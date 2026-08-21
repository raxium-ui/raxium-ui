import type { CSSProperties } from 'react'
import type { FloatingPanelContentProps } from './props'
import { FloatingPanel as ArkFloatingPanel, useFloatingPanelContext } from '@ark-ui/react/floating-panel'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { DepthOwnerProvider, useDepthOwner } from '@raxium/react/hooks/useDepth'
import { useInheritedTheme } from '@raxium/react/hooks/useInheritedTheme'
import { ProvideStructuralComponentTheme } from '@raxium/react/hooks/useProvideComponentTheme'
import { cxc } from '@raxium/themes/utils'
import { isNil } from 'es-toolkit'
import { forwardRef, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useFloatingPanelAppearance } from './floating-panel-appearance-context'
import { floatingPanelResizeTriggers } from './resize-triggers'

export const FloatingPanelContent = forwardRef<HTMLDivElement, FloatingPanelContentProps>(
  ({ className, theme: propsTheme, ui, children, style, ...props }, ref) => {
    const { opacity, resizeAxis } = useFloatingPanelAppearance()
    const api = useFloatingPanelContext()
    const depthOwner = useDepthOwner('floating-panel', { active: true })
    const wasTopmost = useRef(false)
    const theme = useInheritedTheme(propsTheme)
    const crafts = useCraft(theme, 'tvFloatingPanel')
    const topmost = !isNil((api.getContentProps() as Record<string, unknown>)['data-topmost'])

    useEffect(() => {
      if (topmost && !wasTopmost.current)
        depthOwner.bringToFront()
      wasTopmost.current = topmost
    }, [depthOwner.bringToFront, topmost])

    if (typeof document === 'undefined')
      return null

    return createPortal(
      <ProvideStructuralComponentTheme theme={theme}>
        <DepthOwnerProvider owner={depthOwner}>
          <ArkFloatingPanel.Positioner
            className={crafts.positioner(cxc(ui?.positioner))}
            style={{ zIndex: depthOwner.contentZIndex } as CSSProperties}
          >
            <ArkFloatingPanel.Content
              ref={ref}
              className={crafts.content(cxc(ui?.content, className))}
              {...props}
              style={{ opacity: opacity / 100, ...style }}
            >
              {children}
              {floatingPanelResizeTriggers(resizeAxis, {
                resizeVertical: crafts.resizeVertical(cxc(ui?.resizeVertical)),
                resizeHorizontal: crafts.resizeHorizontal(cxc(ui?.resizeHorizontal)),
                resizeCorner: crafts.resizeCorner(cxc(ui?.resizeCorner)),
              })}
            </ArkFloatingPanel.Content>
          </ArkFloatingPanel.Positioner>
        </DepthOwnerProvider>
      </ProvideStructuralComponentTheme>,
      document.body,
    )
  },
)

FloatingPanelContent.displayName = 'FloatingPanel.Content'
