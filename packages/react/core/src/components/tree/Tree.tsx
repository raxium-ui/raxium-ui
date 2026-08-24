import type { TreeNode } from '@ark-ui/react/tree-view'
import type { TreeProps } from './props'
import { TreeView } from '@ark-ui/react/tree-view'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { ProvideComponentTheme } from '@raxium/react/hooks/useProvideComponentTheme'
import { useTheme } from '@raxium/react/hooks/useTheme'
import { useThemeCraft } from '@raxium/react/hooks/useThemeCraft'
import { cxc } from '@raxium/themes/utils'
import { TreeContextProvider } from './tree-context'

export function TreeRoot<T extends TreeNode>({
  className,
  theme: propsTheme,
  craft,
  ui,
  prefix,
  suffix,
  children,
  ...props
}: TreeProps<T>) {
  const theme = useTheme(propsTheme)
  const themed = useThemeCraft(theme, 'tvTree', craft)
  const crafts = useCraft(themed, 'tvTree')
  const branchCrafts = useCraft(themed, 'tvTreeBranch')
  const itemCrafts = useCraft(themed, 'tvTreeItem')
  const checkboxCrafts = useCraft(themed, 'tvCheckbox')

  return (
    <ProvideComponentTheme theme={themed} propsTheme={propsTheme}>
      <TreeContextProvider value={{ branchCrafts, itemCrafts, checkboxCrafts }}>
        <TreeView.Root className={crafts.root(cxc(ui?.root, className))} {...props}>
          {prefix}
          <TreeView.Tree className={crafts.tree(cxc(ui?.tree))}>
            {children}
          </TreeView.Tree>
          {suffix}
        </TreeView.Root>
      </TreeContextProvider>
    </ProvideComponentTheme>
  )
}

TreeRoot.displayName = 'Tree'
