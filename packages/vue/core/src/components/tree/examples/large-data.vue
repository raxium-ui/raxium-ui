<script setup lang="ts">
import { createTreeCollection } from '@ark-ui/vue/tree-view'
import { computed, ref } from 'vue'
import { Tree, TreeCheckboxNode, TreeNode } from '../index'

type Node = {
  id: string
  name: string
  children?: Node[]
}

/** 生成大量树形数据的辅助函数 */
function generateLargeTree(options: {
  topLevelCount: number
  childrenPerBranch: number
  depth?: number
}): Node[] {
  const { topLevelCount, childrenPerBranch, depth = 2 } = options
  const nodes: Node[] = []

  for (let i = 0; i < topLevelCount; i++) {
    const branchId = `branch-${i}`
    const branchName = `分类 ${i + 1}`

    if (depth <= 1) {
      nodes.push({ id: branchId, name: branchName })
      continue
    }

    const children: Node[] = []
    for (let j = 0; j < childrenPerBranch; j++) {
      const childId = `${branchId}-${j}`
      const childName = `项目 ${i + 1}-${j + 1}`

      if (depth <= 2) {
        children.push({ id: childId, name: childName })
        continue
      }

      const grandChildren: Node[] = []
      for (let k = 0; k < Math.min(childrenPerBranch, 10); k++) {
        grandChildren.push({
          id: `${childId}-${k}`,
          name: `子项 ${i + 1}-${j + 1}-${k + 1}`,
        })
      }
      children.push({ id: childId, name: childName, children: grandChildren })
    }

    nodes.push({ id: branchId, name: branchName, children })
  }

  return nodes
}

// 生成大量数据：10 个顶级分类，每个 50 个子项，共约 510 个节点
const children = generateLargeTree({
  topLevelCount: 10,
  childrenPerBranch: 50,
  depth: 2,
})

const rootNode: Node = {
  id: 'root',
  name: 'root',
  children,
}

const collection = computed(() =>
  createTreeCollection<Node>({
    rootNode,
    nodeToValue: node => node.id,
    nodeToString: node => node.name,
    nodeToChildren: node => node.children ?? [],
    isNodeDisabled: () => false,
  }),
)

const expandedValue = ref<string[]>([])
const selectedValue = ref<string[]>(['branch-0-0'])

const expandedCheckbox = ref<string[]>([])
const checkedValue = ref<string[]>(['branch-0-0'])
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="text-sm text-hcc">
      共 {{ rootNode.children?.length ?? 0 }} 个顶级分类，
      {{ rootNode.children?.reduce((s, n) => s + 1 + (n.children?.length ?? 0), 0) ?? 0 }} 个节点
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <div class="flex flex-col gap-2">
        <div class="text-sm text-hcc">
          TreeNode 选中: <span class="text-hff">{{ selectedValue.join(', ') || '(空)' }}</span>
        </div>
        <div class="w-full max-h-[400px] overflow-auto rounded-md border border-h33 p-3">
          <Tree
            v-model:expanded-value="expandedValue"
            v-model:selected-value="selectedValue"
            :collection="collection"
            lazy-mount
            unmount-on-exit
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

      <div class="flex flex-col gap-2">
        <div class="text-sm text-hcc">
          TreeCheckboxNode 勾选: <span class="text-hff">{{ checkedValue.join(', ') || '(空)' }}</span>
        </div>
        <div class="w-full max-h-[400px] overflow-auto rounded-md border border-h33 p-3">
          <Tree
            v-model:expanded-value="expandedCheckbox"
            v-model:checked-value="checkedValue"
            :collection="collection"
            selection-mode="multiple"
            lazy-mount
            unmount-on-exit
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
    </div>
  </div>
</template>
