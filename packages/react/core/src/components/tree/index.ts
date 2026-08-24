import { createTreeCollection } from '@ark-ui/react/tree-view'
import { TreeRoot } from './Tree'
import { TreeCheckboxNodeItem } from './TreeCheckboxNode'
import { TreeNodeItem } from './TreeNode'

export const Tree = Object.assign(TreeRoot, {
  Node: TreeNodeItem,
  CheckboxNode: TreeCheckboxNodeItem,
})

export {
  createTreeCollection,
  TreeCheckboxNodeItem as TreeCheckboxNode,
  TreeNodeItem as TreeNode,
}

export type {
  RenderIconProps,
  RenderNameProps,
  TreeKeyMap,
  TreeNodeData,
  TreeNodeProps,
  TreeProps,
} from './props'
