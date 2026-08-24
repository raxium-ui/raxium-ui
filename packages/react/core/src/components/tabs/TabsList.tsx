import type { TabsListProps } from './props'
import { Tabs as ArkTabs, useTabsContext } from '@ark-ui/react/tabs'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useInheritedTheme } from '@raxium/react/hooks/useInheritedTheme'
import { cxc } from '@raxium/themes/utils'
import { forwardRef, useCallback, useLayoutEffect, useRef } from 'react'
import { scrollActiveTriggerIntoView } from './scroll-active-trigger'
import { useTabsContextEx } from './tabs-context-ex'

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, theme: propsTheme, children, ...props }, ref) => {
    const theme = useInheritedTheme(propsTheme)
    const crafts = useCraft(theme, 'tvTabs')
    const tabs = useTabsContext()
    const { domRevision } = useTabsContextEx()
    const listRef = useRef<HTMLDivElement | null>(null)

    const setListRef = useCallback((node: HTMLDivElement | null) => {
      listRef.current = node
      if (typeof ref === 'function')
        ref(node)
      else if (ref)
        ref.current = node
    }, [ref])

    useLayoutEffect(() => {
      const listEl = listRef.current
      const curValue = tabs.value
      if (!listEl || !curValue)
        return
      scrollActiveTriggerIntoView(listEl, curValue)
    }, [domRevision, tabs.value])

    return (
      <ArkTabs.List
        ref={setListRef}
        className={crafts.list(cxc(className))}
        {...props}
      >
        {children}
      </ArkTabs.List>
    )
  },
)

TabsList.displayName = 'Tabs.List'
