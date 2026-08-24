import type { ReactNode } from 'react'
import type { Crafts } from '@raxium/react/providers/theme'
import { createContext, useContext } from 'react'

export interface TreeContextValue {
  branchCrafts: ReturnType<Crafts['tvTreeBranch']>
  itemCrafts: ReturnType<Crafts['tvTreeItem']>
  checkboxCrafts: ReturnType<Crafts['tvCheckbox']>
}

const TreeContext = createContext<TreeContextValue | null>(null)

export function TreeContextProvider({
  value,
  children,
}: {
  value: TreeContextValue
  children: ReactNode
}) {
  return <TreeContext.Provider value={value}>{children}</TreeContext.Provider>
}

export function useTreeContext() {
  const ctx = useContext(TreeContext)
  if (!ctx)
    throw new Error('Tree.Node must be used within Tree')
  return ctx
}
