import type { FloatingPanelHeaderProps } from './props'
import { FloatingPanel as ArkFloatingPanel } from '@ark-ui/react/floating-panel'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useInheritedTheme } from '@raxium/react/hooks/useInheritedTheme'
import { cxc } from '@raxium/themes/utils'
import { forwardRef } from 'react'

export const FloatingPanelHeader = forwardRef<HTMLDivElement, FloatingPanelHeaderProps>(
  ({ className, theme: propsTheme, ui, control, children, ...props }, ref) => {
    const theme = useInheritedTheme(propsTheme)
    const crafts = useCraft(theme, 'tvFloatingPanel')

    return (
      <ArkFloatingPanel.DragTrigger>
        <ArkFloatingPanel.Header
          ref={ref}
          className={crafts.header(cxc(ui?.root, className))}
          {...props}
        >
          <ArkFloatingPanel.Title className={crafts.title(cxc(ui?.title))}>
            {children}
          </ArkFloatingPanel.Title>
          <ArkFloatingPanel.Control className={crafts.control(cxc(ui?.control))}>
            {control}
          </ArkFloatingPanel.Control>
        </ArkFloatingPanel.Header>
      </ArkFloatingPanel.DragTrigger>
    )
  },
)

FloatingPanelHeader.displayName = 'FloatingPanel.Header'
