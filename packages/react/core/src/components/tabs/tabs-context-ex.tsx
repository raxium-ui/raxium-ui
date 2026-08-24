import type { ReactNode } from 'react'
import { createContext, useContext } from 'react'

export interface TabsContextEx {
  index: number
  orientation: 'horizontal' | 'vertical'
  domRevision: number
}

const TabsContextExContext = createContext<TabsContextEx>({
  index: 0,
  orientation: 'horizontal',
  domRevision: 0,
})

export function TabsContextExProvider({
  value,
  children,
}: {
  value: TabsContextEx
  children: ReactNode
}) {
  return (
    <TabsContextExContext.Provider value={value}>
      {children}
    </TabsContextExContext.Provider>
  )
}

export function useTabsContextEx(): TabsContextEx {
  return useContext(TabsContextExContext)
}
