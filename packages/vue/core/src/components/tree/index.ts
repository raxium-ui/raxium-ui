import type { Component } from 'vue'
import { withCompoundParts } from '../../utils/withCompoundParts'
import TreeRoot from './Tree.vue'
import TreeCheckboxNode from './TreeCheckboxNode.tsx'
import TreeNode from './TreeNode.tsx'

export type { TreeKeyMap, TreeNodeData } from './props'
export * from './props'

export const Tree = withCompoundParts(TreeRoot, {
  Node: TreeNode,
  CheckboxNode: TreeCheckboxNode,
}) as Component & {
  Node: Component
  CheckboxNode: Component
}

export { TreeCheckboxNode, TreeNode }
