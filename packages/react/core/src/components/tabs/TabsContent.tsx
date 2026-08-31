import type { TabsContentProps } from './props'
import { Tabs as ArkTabs } from '@ark-ui/react/tabs'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useInheritedTheme } from '@raxium/react/hooks/useInheritedTheme'
import { ProvideStructuralComponentTheme } from '@raxium/react/hooks/useProvideComponentTheme'
import { cxc } from '@raxium/themes/utils'
import { forwardRef, useLayoutEffect, useRef, useState } from 'react'
import { useTabsContextEx } from './tabs-context-ex'

export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, theme: propsTheme, children, ...props }, ref) => {
    const theme = useInheritedTheme(propsTheme)
    const { index, orientation } = useTabsContextEx()
    const prevIndex = useRef(index)
    const [direction, setDirection] = useState(0)

    useLayoutEffect(() => {
      setDirection(index - prevIndex.current)
      prevIndex.current = index
    }, [index])

    const crafts = useCraft(theme, 'tvTabs')
    const dataDirection = direction < 0 ? 'prev' : direction > 0 ? 'next' : undefined

    return (
      <ProvideStructuralComponentTheme theme={theme}>
        <ArkTabs.Content
          ref={ref}
          className={crafts.content(cxc(className))}
          {...props}
          data-direction={dataDirection}
          data-orientation={orientation}
        >
          {children}
        </ArkTabs.Content>
      </ProvideStructuralComponentTheme>
    )
  },
)

TabsContent.displayName = 'Tabs.Content'
