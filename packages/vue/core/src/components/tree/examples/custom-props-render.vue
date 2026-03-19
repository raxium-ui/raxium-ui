<script setup lang="ts">
import type { TreeCollection } from '@ark-ui/vue/tree-view'
import type { TreeNodeData } from '../index'
import { createTreeCollection } from '@ark-ui/vue/tree-view'
import { computed, h, ref } from 'vue'
import { Icon } from '../../icon'
import { Tree, TreeCheckboxNode, TreeNode } from '../index'

// 标准数据结构，仅使用 string 类型的 icon 和 name
type Node = {
  id: string
  name: string
  icon?: string
  children?: Node[]
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
        { id: 'getting-started', name: 'Getting Started', icon: 'lucide:play' },
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

// 通过 props.renderIcon 自定义图标渲染（不修改 node 原始数据）
function customRenderIcon(props: { icon: any, node: TreeNodeData, state: any, class: string }) {
  if (typeof props.icon !== 'string') {
    return h('span', { class: props.class }, '')
  }
  return h(
    'span',
    { class: `${props.class} inline-flex items-center justify-center w-6 h-6 rounded bg-h22` },
    [h(Icon, { icon: props.icon, class: 'w-4 h-4' })],
  )
}

// 通过 props.renderName 自定义名称渲染（不修改 node 原始数据）
function customRenderName(props: { name: any, node: TreeNodeData, state: any }) {
  const label = typeof props.name === 'string' ? props.name : (props.node as Node).id
  const nodeId = (props.node as Node).id
  const isNew = ['getting-started', 'basic'].includes(nodeId)
  return h('span', { class: 'flex items-center gap-2' }, [
    h('span', label),
    isNew ? h('span', { class: 'text-xs px-1.5 py-0.5 rounded bg-(--color-rz-green) text-black' }, 'NEW') : null,
  ])
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

const expandedCheckbox = ref<string[]>(['docs'])
const checkedValue = ref<string[]>(['getting-started'])
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="text-xs text-h99">
      通过 TreeNode 的 <code>renderIcon</code> 和 <code>renderName</code> props 自定义渲染，不修改 node 数据
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <div class="flex flex-col gap-2">
        <div class="text-sm text-hcc">
          TreeNode: <span class="text-hff">{{ selectedValue.join(', ') || '(empty)' }}</span>
        </div>
        <div class="w-full rounded-md border border-h33 p-3">
          <Tree
            v-model:expanded-value="expandedValue"
            v-model:selected-value="selectedValue"
            :collection="collection"
            selection-mode="single"
          >
            <TreeNode
              v-for="(node, index) in rootNode.children"
              :key="node.id"
              :node="node"
              :index-path="[index]"
              :render-icon="customRenderIcon"
              :render-name="customRenderName"
            />
          </Tree>
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <div class="text-sm text-hcc">
          TreeCheckboxNode: <span class="text-hff">{{ checkedValue.join(', ') || '(empty)' }}</span>
        </div>
        <div class="w-full rounded-md border border-h33 p-3">
          <Tree
            v-model:expanded-value="expandedCheckbox"
            v-model:checked-value="checkedValue"
            :collection="collection"
            selection-mode="multiple"
          >
            <TreeCheckboxNode
              v-for="(node, index) in rootNode.children"
              :key="node.id"
              :node="node"
              :index-path="[index]"
              :render-icon="customRenderIcon"
              :render-name="customRenderName"
            />
          </Tree>
        </div>
      </div>
    </div>
  </div>
</template>
