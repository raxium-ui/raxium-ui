<script setup lang="ts">
import type { TreeCollection } from '@ark-ui/vue/tree-view'
import { createTreeCollection } from '@ark-ui/vue/tree-view'
import { FileCode, FileText, Folder } from 'lucide-vue-next'
import { computed, h, ref } from 'vue'
import { Icon } from '../../icon'
import { Tree, TreeCheckboxNode, TreeNode } from '../index'

type Node = {
  id: string
  name: string | ((props: { node: Node, state: any }) => ReturnType<typeof h>)
  label?: string
  type?: 'folder' | 'file'
  icon?: string | ((props: { node: Node, state: any, class: string }) => ReturnType<typeof h>)
  children?: Node[]
}

// custom renderIcon: 根据 node.type 渲染不同图标
function renderCustomIcon(props: { node: Node, state: any, class: string }) {
  if (typeof props.node.icon === 'string') {
    return h(Icon, { icon: props.node.icon, class: props.class })
  }
  if (props.node.type === 'folder') {
    return h(Folder, { class: props.class, style: { width: '1em', height: '1em' } })
  }
  return h(FileCode, { class: props.class, style: { width: '1em', height: '1em' } })
}

// custom renderName: 带类型标签的名称
function createCustomName(label: string) {
  return (props: { node: Node, state: any }) => {
    const tag = props.node.type === 'folder' ? 'folder' : 'file'
    return h('span', { class: 'flex items-center gap-2' }, [
      h(
        'span',
        { class: 'text-xs px-1.5 py-0.5 rounded bg-(--color-h00) text-(--color-rz-green)' },
        tag,
      ),
      h('span', label),
    ])
  }
}

const rootNode: Node = {
  id: 'root',
  name: 'root',
  type: 'folder',
  icon: renderCustomIcon,
  children: [
    {
      id: 'src',
      name: createCustomName('src'),
      label: 'src',
      type: 'folder',
      icon: renderCustomIcon,
      children: [
        {
          id: 'main.ts',
          name: createCustomName('main.ts'),
          label: 'main.ts',
          type: 'file',
          icon: renderCustomIcon,
        },
        {
          id: 'utils.ts',
          name: 'utils.ts',
          type: 'file',
          icon: renderCustomIcon,
        },
      ],
    },
    {
      id: 'readme',
      name: () => h('span', { class: 'flex items-center gap-1.5' }, ['README.md']),
      label: 'README.md',
      type: 'file',
      icon: props => h(FileText, { class: props.class, style: { width: '1em', height: '1em' } }),
    },
  ],
}

const collection = computed<TreeCollection<Node>>(() => {
  return createTreeCollection<Node>({
    rootNode,
    nodeToValue: node => node.id,
    nodeToString: node => node.label ?? (typeof node.name === 'string' ? node.name : node.id),
    nodeToChildren: node => node.children ?? [],
    isNodeDisabled: () => false,
  })
})

const expandedValue = ref<string[]>(['src'])
const selectedValue = ref<string[]>(['main.ts'])

const expandedCheckbox = ref<string[]>(['src'])
const checkedValue = ref<string[]>(['main.ts'])
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="text-xs text-h99">
      custom renderIcon: node.icon 为 function，根据 type 渲染 Folder/FileCode/FileText
      <br>
      custom renderName: node.name 为 function 时渲染自定义内容（如 README 带图标）
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <div class="flex flex-col gap-2">
        <div class="text-sm text-hcc">
          TreeNode selected: <span class="text-hff">{{ selectedValue.join(', ') || '(empty)' }}</span>
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
            />
          </Tree>
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <div class="text-sm text-hcc">
          TreeCheckboxNode checked: <span class="text-hff">{{ checkedValue.join(', ') || '(empty)' }}</span>
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
            />
          </Tree>
        </div>
      </div>
    </div>
  </div>
</template>
