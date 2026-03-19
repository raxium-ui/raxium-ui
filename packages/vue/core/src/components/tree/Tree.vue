<script setup lang="ts" generic="T = TreeNode">
import type { TreeNode } from '@ark-ui/vue/tree-view'
import type { TreeProps, TreeViewRootEmits } from '.'
import { useForwardProps } from '@ark-ui/vue'
import { TreeView, useTreeView } from '@ark-ui/vue/tree-view'
import { clsx } from '@raxium/themes/utils'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { ThemeProvider } from '@raxium/vue/providers/theme'
import { computed } from 'vue'
import { provideTreeContext } from './tree-context'

const { class: propsClass, theme: propsTheme, ui, ...props } = defineProps<TreeProps<T>>()
const emits = defineEmits<TreeViewRootEmits<T>>()
const forwarded = useForwardProps<TreeProps<T>, any>(props)
const treeView = useTreeView<T>(forwarded, emits)

// theme（根节点统一 provide，供 TreeNode/TreeCheckboxNode inject，避免每节点 useTheme）
const theme = useTheme(() => propsTheme)
const crafts = computed(() => theme.value.crafts.tvTree())

// context
provideTreeContext({
  branchCrafts: computed(() => theme.value.crafts.tvTreeBranch()),
  itemCrafts: computed(() => theme.value.crafts.tvTreeItem()),
  checkboxCrafts: computed(() => theme.value.crafts.tvCheckbox()),
})
</script>

<template>
  <TreeView.RootProvider
    :value="treeView"
    :class="crafts.root({ class: clsx(ui?.root, propsClass), ...theme })"
  >
    <ThemeProvider :value="theme">
      <slot name="prefix" />
      <TreeView.Tree :class="crafts.tree({ class: clsx(ui?.tree), ...theme })">
        <slot />
      </TreeView.Tree>
      <slot name="suffix" />
    </ThemeProvider>
  </TreeView.RootProvider>
</template>
