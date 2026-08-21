import type { FloatingPanelCloseTriggerProps } from './props'
import { FloatingPanel as ArkFloatingPanel } from '@ark-ui/react/floating-panel'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useInheritedTheme } from '@raxium/react/hooks/useInheritedTheme'
import { cxc } from '@raxium/themes/utils'
import { X } from 'lucide-react'
import { forwardRef } from 'react'

export const FloatingPanelCloseTrigger = forwardRef<HTMLButtonElement, FloatingPanelCloseTriggerProps>(
  ({ className, theme: propsTheme, children, ...props }, ref) => {
    const theme = useInheritedTheme(propsTheme)
    const crafts = useCraft(theme, 'tvFloatingPanel')

    return (
      <ArkFloatingPanel.CloseTrigger
        ref={ref}
        className={crafts.trigger(cxc(className))}
        {...props}
      >
        {children ?? <X />}
      </ArkFloatingPanel.CloseTrigger>
    )
  },
)

FloatingPanelCloseTrigger.displayName = 'FloatingPanel.CloseTrigger'
