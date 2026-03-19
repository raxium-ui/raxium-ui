<script setup lang="ts">
import type { TreeCollection } from '@ark-ui/vue/tree-view'
import { createTreeCollection } from '@ark-ui/vue/tree-view'
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

const expanded1 = ref<string[]>(['docs'])
const selectedSingle = ref<string[]>(['getting-started'])

const expanded2 = ref<string[]>(['docs'])
const selectedMultiple = ref<string[]>(['getting-started', 'api'])
</script>

<template>
  <div class="w-full flex flex-col gap-3">
    <div class="text-sm text-hcc">
      single: <span class="text-hff">{{ selectedSingle.join(', ') || '(empty)' }}</span>
      / multiple: <span class="text-hff">{{ selectedMultiple.join(', ') || '(empty)' }}</span>
    </div>

    <div class="grid gap-3 md:grid-cols-2">
      <div class="rounded-md border border-h33 p-3">
        <div class="mb-2 text-sm text-hcc">
          selectionMode=single
        </div>
        <Tree
          :collection="collection"
          selection-mode="single"
          v-model:expanded-value="expanded1"
          v-model:selected-value="selectedSingle"
        >
          <TreeNode
            v-for="(node, index) in rootNode.children"
            :key="node.id"
            :node="node"
            :index-path="[index]"
          />
        </Tree>
      </div>

      <div class="rounded-md border border-h33 p-3">
        <div class="mb-2 text-sm text-hcc">
          selectionMode=multiple
        </div>
        <Tree
          :collection="collection"
          selection-mode="multiple"
          v-model:expanded-value="expanded2"
          v-model:selected-value="selectedMultiple"
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
  </div>
</template>

