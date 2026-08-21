import type { FloatingPanelPinTriggerProps } from './props'
import { ark } from '@ark-ui/react/factory'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useInheritedTheme } from '@raxium/react/hooks/useInheritedTheme'
import { cxc } from '@raxium/themes/utils'
import { Pin, PinOff } from 'lucide-react'
import { forwardRef } from 'react'
import { useFloatingPanelAppearance } from './floating-panel-appearance-context'

export const FloatingPanelPinTrigger = forwardRef<HTMLButtonElement, FloatingPanelPinTriggerProps>(
  ({ className, theme: propsTheme, children, onClick, ...props }, ref) => {
    const { pinned, setPinned } = useFloatingPanelAppearance()
    const theme = useInheritedTheme(propsTheme)
    const crafts = useCraft(theme, 'tvFloatingPanel')

    return (
      <ark.button
        ref={ref}
        type="button"
        className={crafts.trigger(cxc(className))}
        {...props}
        onClick={(event) => {
          onClick?.(event)
          if (event.defaultPrevented)
            return
          setPinned(!pinned)
        }}
      >
        {children ?? (pinned ? <PinOff /> : <Pin />)}
      </ark.button>
    )
  },
)

FloatingPanelPinTrigger.displayName = 'FloatingPanel.PinTrigger'
