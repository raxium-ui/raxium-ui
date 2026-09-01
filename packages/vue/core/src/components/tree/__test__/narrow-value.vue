<script setup lang="ts">
import { createTreeCollection } from '@ark-ui/vue/tree-view'
import { ref } from 'vue'
import { Tree } from '../index'

interface Node {
  id: string
  children?: Node[]
}

const rootNode: Node = { id: 'root', children: [] }
const collection = createTreeCollection<Node>({
  rootNode,
  nodeToValue: node => node.id,
  nodeToString: node => node.id,
  nodeToChildren: node => node.children ?? [],
})

const stringValue = ref<string[]>([])
const numberValue = ref<number[]>([])

function onString(value: string[]) {
  stringValue.value = value
}

function onNumber(value: number[]) {
  numberValue.value = value
}
</script>

<template>
  <Tree
    :collection="collection"
    :selected-value="stringValue"
    @update:selected-value="onString"
  />
  <Tree
    :collection="collection"
    :selected-value="numberValue"
    @update:selected-value="onNumber"
  />
</template>
