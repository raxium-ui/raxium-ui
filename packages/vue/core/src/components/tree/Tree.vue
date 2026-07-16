<script setup lang="ts" generic="T = TreeNode">
import type { TreeNode } from '@ark-ui/vue/tree-view'
import type { TreeProps, TreeViewRootEmits } from '.'
import { useForwardProps } from '@ark-ui/vue'
import { TreeView, useTreeView } from '@ark-ui/vue/tree-view'
import { cxc } from '@raxium/themes/utils'
import { useCraft, useTheme, useThemeCraft } from '@raxium/vue/composables'
import { useProvideComponentTheme } from '@raxium/vue/composables/useProvideComponentTheme'
import { provideTreeContext } from './tree-context'

const {
  class: propsClass,
  theme: propsTheme,
  craft,
  ui,
  ...props
} = defineProps<TreeProps<T>>()
const emits = defineEmits<TreeViewRootEmits<T>>()
const forwarded = useForwardProps<TreeProps<T>, any>(props)
const treeView = useTreeView<T>(forwarded, emits)

// theme（根节点统一 provide，供 TreeNode/TreeCheckboxNode inject，避免每节点 useTheme）
const theme = useTheme(() => propsTheme)
const themed = useThemeCraft(theme, 'tvTree', () => craft)
useProvideComponentTheme(themed, () => propsTheme)
const crafts = useCraft(themed, 'tvTree')

// context
provideTreeContext({
  branchCrafts: useCraft(themed, 'tvTreeBranch'),
  itemCrafts: useCraft(themed, 'tvTreeItem'),
  checkboxCrafts: useCraft(themed, 'tvCheckbox'),
})
</script>

<template>
  <TreeView.RootProvider
    :value="treeView"
    :class="crafts.root(cxc(ui?.root, propsClass))"
  >
    <slot name="prefix" />
    <TreeView.Tree :class="crafts.tree(cxc(ui?.tree))">
      <slot />
    </TreeView.Tree>
    <slot name="suffix" />
  </TreeView.RootProvider>
</template>
