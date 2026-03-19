import type { TreeNode } from '@ark-ui/vue/tree-view'
import type * as treeView from '@zag-js/tree-view'

export type RootEmits<T extends TreeNode> = {
  /**
   * Called when the tree is opened or closed
   */
  'expandedChange': [details: treeView.ExpandedChangeDetails]
  /**
   * Called when the focused node changes
   */
  'focusChange': [details: treeView.FocusChangeDetails]
  /**
   * Called when the selection changes
   */
  'selectionChange': [details: treeView.SelectionChangeDetails]
  /**
   * Called when the checked value changes
   */
  'checkedChange': [details: treeView.CheckedChangeDetails]
  /**
   * A function that is called when the children are loaded successfully.
   */
  'loadChildrenComplete': [details: treeView.LoadChildrenCompleteDetails<T>]
  /**
   * A function that is called when there is an error loading the children.
   */
  'loadChildrenError': [details: treeView.LoadChildrenErrorDetails<T>]
  /**
   * Called when a node starts being renamed
   */
  'renameStart': [details: treeView.RenameStartDetails<T>]
  /**
   * Called before a rename is completed. Return false to prevent the rename.
   */
  'beforeRename': [details: treeView.RenameCompleteDetails]
  /**
   * Called when a node label rename is completed
   */
  'renameComplete': [details: treeView.RenameCompleteDetails]
  /**
   * Called when the expanded value changes
   */
  'update:expandedValue': [value: string[]]
  /**
   * Called when the focused value changes
   */
  'update:focusedValue': [value: string | null]
  /**
   * Called when the selected value changes
   */
  'update:selectedValue': [value: string[]]
  /**
   * Called when the checked value changes
   */
  'update:checkedValue': [value: string[]]
}
