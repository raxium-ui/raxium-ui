import type { TabsIndicatorProps } from './props'
import { Tabs as ArkTabs } from '@ark-ui/react/tabs'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useInheritedTheme } from '@raxium/react/hooks/useInheritedTheme'
import { cxc } from '@raxium/themes/utils'
import { forwardRef } from 'react'
import { useTabsContextEx } from './tabs-context-ex'

export const TabsIndicator = forwardRef<HTMLDivElement, TabsIndicatorProps>(
  ({ className, theme: propsTheme, children, ...props }, ref) => {
    const theme = useInheritedTheme(propsTheme)
    const { orientation } = useTabsContextEx()
    const crafts = useCraft(theme, 'tvTabs', { orientation })

    return (
      <ArkTabs.Indicator
        ref={ref}
        className={crafts.indicator(cxc(className))}
        {...props}
      >
        {children}
      </ArkTabs.Indicator>
    )
  },
)

TabsIndicator.displayName = 'Tabs.Indicator'
