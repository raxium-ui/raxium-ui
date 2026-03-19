<script setup lang="ts">
import type { TreeCollection } from '@ark-ui/vue/tree-view'
import type { TreeKeyMap } from '../index'
import { createTreeCollection } from '@ark-ui/vue/tree-view'
import { computed, ref } from 'vue'
import { Tree, TreeCheckboxNode, TreeNode } from '../index'

// 使用自定义字段名称的数据结构（含索引签名以兼容 TreeNodeData）
interface CustomNode extends Record<string, unknown> {
  nodeId: string
  label: string
  iconName?: string
  items?: CustomNode[]
}

// keyMap 将 TreeNode 期望的默认字段映射到自定义数据结构的字段名
const keyMap: TreeKeyMap = {
  id: 'nodeId',
  name: 'label',
  children: 'items',
  icon: 'iconName',
}

const rootNode: CustomNode = {
  nodeId: 'root',
  label: '项目根目录',
  items: [
    {
      nodeId: 'frontend',
      label: '前端',
      iconName: 'lucide:code',
      items: [
        { nodeId: 'vue', label: 'Vue', iconName: 'lucide:component' },
        { nodeId: 'react', label: 'React', iconName: 'lucide:atom' },
      ],
    },
    {
      nodeId: 'backend',
      label: '后端',
      iconName: 'lucide:server',
      items: [
        { nodeId: 'node', label: 'Node.js', iconName: 'lucide:box' },
        { nodeId: 'go', label: 'Go', iconName: 'lucide:terminal' },
      ],
    },
  ],
}

const collection = computed<TreeCollection<CustomNode>>(() => {
  return createTreeCollection<CustomNode>({
    rootNode,
    nodeToValue: node => node.nodeId,
    nodeToString: node => node.label,
    nodeToChildren: node => node.items ?? [],
    isNodeDisabled: () => false,
  })
})

const expandedValue = ref<string[]>(['frontend'])
const selectedValue = ref<string[]>(['vue'])

const expandedCheckbox = ref<string[]>(['frontend'])
const checkedValue = ref<string[]>(['vue'])
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="text-xs text-h99">
      数据使用自定义字段: nodeId、label、items、iconName，通过 keyMap 映射
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <div class="flex flex-col gap-2">
        <div class="text-sm text-hcc">
          TreeNode 选中: <span class="text-hff">{{ selectedValue.join(', ') || '(空)' }}</span>
        </div>
        <div class="w-full rounded-md border border-h33 p-3">
          <Tree
            v-model:expanded-value="expandedValue"
            v-model:selected-value="selectedValue"
            :collection="collection"
            selection-mode="single"
          >
            <TreeNode
              v-for="(node, index) in rootNode.items"
              :key="node.nodeId"
              :node="node"
              :index-path="[index]"
              :key-map="keyMap"
            />
          </Tree>
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <div class="text-sm text-hcc">
          TreeCheckboxNode 勾选: <span class="text-hff">{{ checkedValue.join(', ') || '(空)' }}</span>
        </div>
        <div class="w-full rounded-md border border-h33 p-3">
          <Tree
            v-model:expanded-value="expandedCheckbox"
            v-model:checked-value="checkedValue"
            :collection="collection"
            selection-mode="multiple"
          >
            <TreeCheckboxNode
              v-for="(node, index) in rootNode.items"
              :key="node.nodeId"
              :node="node"
              :index-path="[index]"
              :key-map="keyMap"
            />
          </Tree>
        </div>
      </div>
    </div>
  </div>
</template>
