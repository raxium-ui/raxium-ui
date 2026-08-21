import type { FloatingPanelOpacityTriggerProps } from './props'
import { ark } from '@ark-ui/react/factory'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useInheritedTheme } from '@raxium/react/hooks/useInheritedTheme'
import { cxc } from '@raxium/themes/utils'
import { forwardRef } from 'react'

export const FloatingPanelOpacityTrigger = forwardRef<HTMLButtonElement, FloatingPanelOpacityTriggerProps>(
  ({ className, theme: propsTheme, children, ...props }, ref) => {
    const theme = useInheritedTheme(propsTheme)
    const crafts = useCraft(theme, 'tvFloatingPanel')

    return (
      <ark.button
        ref={ref}
        type="button"
        className={crafts.trigger(cxc(className))}
        {...props}
      >
        {children}
      </ark.button>
    )
  },
)

FloatingPanelOpacityTrigger.displayName = 'FloatingPanel.OpacityTrigger'
