import { withCompoundParts } from '../../utils/withCompoundParts'
import TreeRoot from './Tree.vue'
import TreeCheckboxNode from './TreeCheckboxNode.tsx'
import TreeNode from './TreeNode.tsx'

export type { TreeKeyMap, TreeNodeData } from './props'
export * from './props'

export const Tree: typeof TreeRoot & {
  Node: typeof TreeNode
  CheckboxNode: typeof TreeCheckboxNode
} = withCompoundParts(TreeRoot, {
  Node: TreeNode,
  CheckboxNode: TreeCheckboxNode,
})

export { TreeCheckboxNode, TreeNode, TreeRoot }
