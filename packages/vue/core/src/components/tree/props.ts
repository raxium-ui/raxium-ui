import type { TreeViewRootBaseProps } from '@ark-ui/vue'
import type { TreeNode } from '@ark-ui/vue/tree-view'
import type { ThemeCrafts } from '@raxium/vue/providers'
import type { HTMLAttributes } from 'vue'
import type { RootEmits } from './tree'

/** 将 TreeNode 默认字段映射到节点数据中的实际字段名，用于自定义数据结构 */
export interface TreeKeyMap {
  id?: string
  name?: string
  children?: string
  icon?: string
}

/** 树节点数据，支持任意结构的对象（配合 keyMap 使用） */
export type TreeNodeData = Record<string, unknown>

export type TreeValueType = string | number | boolean | null | symbol | bigint
export interface TreeProps<T>
  extends Omit<
    TreeViewRootBaseProps<T>,
    | 'checkedValue'
    | 'defaultCheckedValue'
    | 'defaultExpandedValue'
    | 'defaultSelectedValue'
    | 'defaultFocusedValue'
    | 'expandedValue'
    | 'selectedValue'
    | 'focusedValue'
  >,
  ThemeCrafts<'tvTree'> {
  class?: HTMLAttributes['class']
  ui?: {
    root?: HTMLAttributes['class']
    tree?: HTMLAttributes['class']
  }
  modelValue?: TreeValueType[]
  defaultValue?: TreeValueType[]
  checkedValue?: TreeValueType[]
  defaultCheckedValue?: TreeValueType[]
  defaultExpandedValue?: TreeValueType[]
  defaultSelectedValue?: TreeValueType[]
  defaultFocusedValue?: TreeValueType
  expandedValue?: TreeValueType[]
  selectedValue?: TreeValueType[]
  focusedValue?: TreeValueType
}

export interface TreeViewRootEmits<T extends TreeNode>
  extends Omit<
    RootEmits<T>,
    'update:expandedValue' | 'update:focusedValue' | 'update:selectedValue' | 'update:checkedValue'
  > {
  'update:expandedValue': [value: TreeValueType[]]
  'update:focusedValue': [value: TreeValueType]
  'update:selectedValue': [value: TreeValueType[]]
  'update:checkedValue': [value: TreeValueType[]]
}
