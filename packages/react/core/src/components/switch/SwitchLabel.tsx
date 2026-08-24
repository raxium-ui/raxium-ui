import type { SwitchLabelProps } from './props'
import { Switch as ArkSwitch } from '@ark-ui/react/switch'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useInheritedTheme } from '@raxium/react/hooks/useInheritedTheme'
import { cxc } from '@raxium/themes/utils'
import { forwardRef } from 'react'

export const SwitchLabel = forwardRef<HTMLSpanElement, SwitchLabelProps>(
  ({ className, theme: propsTheme, children, ...props }, ref) => {
    const theme = useInheritedTheme(propsTheme)
    const crafts = useCraft(theme, 'tvSwitch')

    return (
      <ArkSwitch.Label
        ref={ref}
        className={crafts.label(cxc(className))}
        {...props}
      >
        {children}
      </ArkSwitch.Label>
    )
  },
)

SwitchLabel.displayName = 'Switch.Label'
