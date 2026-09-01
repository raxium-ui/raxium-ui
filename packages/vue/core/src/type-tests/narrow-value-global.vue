<script setup lang="ts">
import { createListCollection } from '@ark-ui/vue/select'
import { createTreeCollection } from '@ark-ui/vue/tree-view'
import { ref } from 'vue'

interface Node {
  id: string
  children?: Node[]
}

const options = createListCollection({
  items: [{ label: 'One', value: 1 }],
})
const rootNode: Node = { id: 'root', children: [] }
const tree = createTreeCollection<Node>({
  rootNode,
  nodeToValue: node => node.id,
  nodeToString: node => node.id,
  nodeToChildren: node => node.children ?? [],
})

const radioValue = ref('')
const checkboxValue = ref<string[]>([])
const selectValue = ref<number[]>([])
const selectedValue = ref<string[]>([])

function onRadio(value: string) {
  radioValue.value = value
}

function onCheckbox(value: string[]) {
  checkboxValue.value = value
}

function onSelect(value: number[]) {
  selectValue.value = value
}

function onSelected(value: string[]) {
  selectedValue.value = value
}
</script>

<template>
  <RRadioGroup :model-value="radioValue" @update:model-value="onRadio" />
  <RCheckboxGroup :model-value="checkboxValue" @update:model-value="onCheckbox" />
  <RSelect
    :collection="options"
    :model-value="selectValue"
    @update:model-value="onSelect"
  />
  <RTree
    :collection="tree"
    :selected-value="selectedValue"
    @update:selected-value="onSelected"
  />
</template>
