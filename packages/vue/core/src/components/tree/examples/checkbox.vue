<script setup lang="ts">
import type { TreeCollection } from '@ark-ui/vue/tree-view'
import { createTreeCollection } from '@ark-ui/vue/tree-view'
import { computed, ref } from 'vue'
import { Tree, TreeCheckboxNode } from '../index'

type Node = {
  id: string
  name: string
  icon?: string
  children?: Node[]
  disabled?: boolean
}

const rootNode: Node = {
  id: 'root',
  name: 'root',
  children: [
    {
      id: 'docs',
      name: 'Docs',
      icon: 'lucide:book',
      children: [
        { id: 'getting-started', name: 'Getting Started', icon: 'lucide:play', disabled: true },
        { id: 'api', name: 'API', icon: 'lucide:braces' },
      ],
    },
    {
      id: 'examples',
      name: 'Examples',
      icon: 'lucide:folder',
      children: [
        { id: 'basic', name: 'Basic', icon: 'lucide:sparkles' },
        { id: 'advanced', name: 'Advanced', icon: 'lucide:settings' },
      ],
    },
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
const checkedValue = ref<string[]>(['getting-started'])
</script>

<template>
  <div class="w-full flex flex-col gap-2">
    <div class="text-sm text-hcc">
      checked: <span class="text-hff">{{ checkedValue.join(', ') || '(empty)' }}</span>
    </div>

    <div class="w-full max-w-[560px] rounded-md border border-h33 p-3">
      <Tree
        v-model:expanded-value="expandedValue"
        v-model:checked-value="checkedValue"
        :collection="collection"
        selection-mode="multiple"
      >
        <TreeCheckboxNode
          v-for="(node, index) in rootNode.children"
          :key="node.id"
          :node="node"
          :index-path="[index]"
        />
      </Tree>
    </div>
  </div>
</template>
