import type { TabsProps } from './props'
import type { TabsContextEx } from './tabs-context-ex'
import { Tabs as ArkTabs, useTabsContext } from '@ark-ui/react/tabs'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { ProvideComponentTheme } from '@raxium/react/hooks/useProvideComponentTheme'
import { useTheme } from '@raxium/react/hooks/useTheme'
import { useThemeCraft } from '@raxium/react/hooks/useThemeCraft'
import { cxc } from '@raxium/themes/utils'
import { forwardRef, useCallback, useLayoutEffect, useMemo, useState } from 'react'
import { TabsContextExProvider } from './tabs-context-ex'

function TabsExBridge({
  rootEl,
  orientation,
  children,
}: {
  rootEl: HTMLDivElement | null
  orientation: TabsContextEx['orientation']
  children: TabsProps['children']
}) {
  const tabs = useTabsContext()
  const [domRevision, setDomRevision] = useState(0)

  useLayoutEffect(() => {
    if (!rootEl)
      return
    const observer = new MutationObserver(() => {
      setDomRevision(revision => revision + 1)
    })
    observer.observe(rootEl, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [rootEl])

  const index = useMemo(() => {
    void domRevision
    if (!rootEl)
      return 0
    const tabTriggerEls = Array.from(
      rootEl.querySelectorAll('[data-part="trigger"]'),
    ) as HTMLElement[]
    if (!tabTriggerEls.length)
      return 0
    const curIndex = tabTriggerEls.findIndex(
      el => el.getAttribute('data-value') === tabs.value,
    )
    return curIndex < 0 ? 0 : curIndex
  }, [domRevision, rootEl, tabs.value])

  const value = useMemo<TabsContextEx>(() => ({
    index,
    orientation,
    domRevision,
  }), [domRevision, index, orientation])

  return (
    <TabsContextExProvider value={value}>
      {children}
    </TabsContextExProvider>
  )
}

export const TabsRoot = forwardRef<HTMLDivElement, TabsProps>(
  ({ className, theme: propsTheme, craft, children, orientation = 'horizontal', ...props }, ref) => {
    const theme = useTheme(propsTheme)
    const themed = useThemeCraft(theme, 'tvTabs', craft)
    const crafts = useCraft(themed, 'tvTabs', { orientation })
    const [rootEl, setRootEl] = useState<HTMLDivElement | null>(null)

    const setRootRef = useCallback((node: HTMLDivElement | null) => {
      setRootEl(node)
      if (typeof ref === 'function')
        ref(node)
      else if (ref)
        ref.current = node
    }, [ref])

    return (
      <ProvideComponentTheme theme={themed} propsTheme={propsTheme}>
        <ArkTabs.Root
          ref={setRootRef}
          className={crafts.root(cxc(className))}
          orientation={orientation}
          {...props}
        >
          <TabsExBridge rootEl={rootEl} orientation={orientation}>
            {children}
          </TabsExBridge>
        </ArkTabs.Root>
      </ProvideComponentTheme>
    )
  },
)

TabsRoot.displayName = 'Tabs'
