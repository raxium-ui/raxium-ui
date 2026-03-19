<script setup lang="ts">
import type { TreeCollection } from '@ark-ui/vue/tree-view'
import { createTreeCollection } from '@ark-ui/vue/tree-view'
import { THEME_SIZE } from '@raxium/shared/constant'
import { computed, ref } from 'vue'
import { Tree, TreeNode } from '../index'

type Node = {
  id: string
  name: string
  children?: Node[]
}

const rootNode: Node = {
  id: 'root',
  name: 'root',
  children: [
    {
      id: 'docs',
      name: 'Docs',
      children: [
        { id: 'getting-started', name: 'Getting Started' },
        { id: 'api', name: 'API' },
      ],
    },
    {
      id: 'examples',
      name: 'Examples',
      children: [
        { id: 'basic', name: 'Basic' },
        { id: 'advanced', name: 'Advanced' },
      ],
    },
    { id: 'changelog', name: 'Changelog' },
  ],
}

const collection = computed<TreeCollection<Node>>(() => {
  return createTreeCollection<Node>({
    rootNode,
    nodeToValue: node => node.id,
    nodeToString: node => node.name,
    nodeToChildren: node => node.children ?? [],
    isNodeDisabled: () => false,
  })
})

const expandedValue = ref<string[]>(['docs'])
const selectedValue = ref<string[]>(['getting-started'])
</script>

<template>
  <div class="w-full flex flex-col gap-2">
    <div
      v-for="size in THEME_SIZE"
      :key="size"
      class="w-full max-w-[560px] rounded-md border border-h33 p-3"
    >
      <Tree
        v-model:expanded-value="expandedValue"
        v-model:selected-value="selectedValue"
        :collection="collection"
        :theme="{ size }"
      >
        <TreeNode
          v-for="(node, index) in rootNode.children"
          :key="node.id"
          :node="node"
          :index-path="[index]"
        />
      </Tree>
    </div>
  </div>
</template>
