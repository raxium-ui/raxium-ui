<script setup lang="ts">
import { createListCollection } from '@ark-ui/vue/select'
import { ref } from 'vue'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../index'

const stringCollection = createListCollection({
  items: [{ label: 'A', value: 'a' }],
})
const numberCollection = createListCollection({
  items: [{ label: 'One', value: 1 }],
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
  <Select :collection="stringCollection" :model-value="stringValue" @update:model-value="onString">
    <SelectTrigger>
      <SelectValue placeholder="string" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem :item="stringCollection.items[0]" />
    </SelectContent>
  </Select>
  <Select :collection="numberCollection" :model-value="numberValue" @update:model-value="onNumber">
    <SelectTrigger>
      <SelectValue placeholder="number" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem :item="numberCollection.items[0]" />
    </SelectContent>
  </Select>
</template>
