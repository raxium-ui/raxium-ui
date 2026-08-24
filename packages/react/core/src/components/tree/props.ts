import type { TreeViewRootBaseProps } from '@ark-ui/react/tree-view'
import type { TreeNode } from '@ark-ui/react/tree-view'
import type { ThemeCrafts } from '@raxium/react/providers/theme'
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'
import type { useTreeViewNodeContext } from '@ark-ui/react/tree-view'

type ClassName = HTMLAttributes<HTMLElement>['className']

export interface TreeKeyMap {
  id?: string
  name?: string
  children?: string
  icon?: string
}

export type TreeNodeData = Record<string, unknown>

export type ResolvedKeyMap = {
  id: string
  name: string
  children: string
  icon: string
}

export type TreeNodeState = ReturnType<typeof useTreeViewNodeContext>

export interface RenderIconProps {
  icon: unknown
  node: TreeNodeData
  state: TreeNodeState
  className?: string
}

export interface RenderNameProps {
  name: unknown
  node: TreeNodeData
  state: TreeNodeState
}

export interface TreeProps<T extends TreeNode = TreeNode>
  extends TreeViewRootBaseProps<T>, ThemeCrafts<'tvTree'> {
  className?: ClassName
  prefix?: ReactNode
  suffix?: ReactNode
  children?: ReactNode
  ui?: {
    root?: ClassName
    tree?: ClassName
  }
}

export interface TreeNodeProps {
  className?: ClassName
  node: TreeNodeData
  nodeIndent?: number
  indexPath: number[]
  keyMap?: Partial<TreeKeyMap>
  renderIcon?: (props: RenderIconProps) => ReactNode
  renderName?: (props: RenderNameProps) => ReactNode
  ui?: {
    branch?: ClassName
    branchControl?: ClassName
    branchTitle?: ClassName
    branchIcon?: ClassName
    branchText?: ClassName
    branchIndicator?: ClassName
    branchContent?: ClassName
    item?: ClassName
    itemTitle?: ClassName
    itemIcon?: ClassName
    itemText?: ClassName
    branchCheckbox?: ClassName
    branchCheckboxIndicator?: ClassName
    itemCheckbox?: ClassName
    itemCheckboxIndicator?: ClassName
  }
  style?: CSSProperties
}
