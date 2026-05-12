<script setup lang="ts">
import type { TreeCollection } from '@ark-ui/vue/tree-view'
import { createTreeCollection } from '@ark-ui/vue/tree-view'
import { computed, ref } from 'vue'
import { Tree, TreeCheckboxNode } from '../index'

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

const expandedValue = ref<string[]>(['docs'])
const selectedValue = ref<string[]>([])
const checkedValue = ref<string[]>([])
const focusedValue = ref<string>()

const lines = ref<string[]>([])
function push(line: string) {
  lines.value = [line, ...lines.value].slice(0, 8)
}
</script>

<template>
  <div class="w-full flex flex-col gap-3">
    <div class="text-sm text-gray-cc">
      expanded: <span class="text-gray-ff">{{ expandedValue.join(', ') || '(empty)' }}</span>
      / selected: <span class="text-gray-ff">{{ selectedValue.join(', ') || '(empty)' }}</span>
      / checked: <span class="text-gray-ff">{{ checkedValue.join(', ') || '(empty)' }}</span>
      / focused: <span class="text-gray-ff">{{ focusedValue || '(null)' }}</span>
    </div>

    <div class="w-full max-w-[560px] rounded-md border border-gray-33 p-3">
      <Tree
        v-model:expanded-value="expandedValue"
        v-model:selected-value="selectedValue"
        v-model:checked-value="checkedValue"
        v-model:focused-value="focusedValue"
        :collection="collection"
        selection-mode="multiple"
        @expanded-change="(d) => push(`expanded-change: ${d.expandedValue.join(', ')}`)"
        @selection-change="(d) => push(`selection-change: ${d.selectedValue.join(', ')}`)"
        @checked-change="(d) => push(`checked-change: ${d.checkedValue.join(', ')}`)"
        @focus-change="(d) => push(`focus-change: ${d.focusedValue ?? 'null'}`)"
      >
        <TreeCheckboxNode
          v-for="(node, index) in rootNode.children"
          :key="node.id"
          :node="node"
          :index-path="[index]"
        />
      </Tree>
    </div>

    <pre class="w-full max-w-[560px] whitespace-pre-wrap rounded-md bg-gray-0c p-3 text-xs text-gray-cc">{{ lines.length ? lines.join('\n') : '（暂无事件）' }}</pre>
  </div>
</template>
