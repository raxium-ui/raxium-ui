import type { TabsTriggerProps } from './props'
import { Tabs as ArkTabs } from '@ark-ui/react/tabs'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useInheritedTheme } from '@raxium/react/hooks/useInheritedTheme'
import { cxc } from '@raxium/themes/utils'
import { forwardRef } from 'react'
import { useTabsContextEx } from './tabs-context-ex'

export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, theme: propsTheme, children, ...props }, ref) => {
    const theme = useInheritedTheme(propsTheme)
    const { orientation } = useTabsContextEx()
    const crafts = useCraft(theme, 'tvTabs', { orientation })

    return (
      <ArkTabs.Trigger
        ref={ref}
        className={crafts.trigger(cxc(className))}
        {...props}
      >
        {children}
      </ArkTabs.Trigger>
    )
  },
)

TabsTrigger.displayName = 'Tabs.Trigger'
