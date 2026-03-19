<script setup lang="ts">
import { createListCollection } from '@ark-ui/vue/select'
import { fakerEN } from '@faker-js/faker'
import { ref } from 'vue'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../index'

const collection = createListCollection({
  items: Array.from({ length: 6 }, (_, index) => ({
    label: fakerEN.animal.bird(),
    value: index,
  })),
})
const modelValue = ref<number[]>([2])
</script>

<template>
  <div class="w-full flex flex-col gap-3">
    <div class="text-sm text-hff">
      modelValue: {{ modelValue }}
    </div>

    <Select
      v-model="modelValue"
      :collection="collection"
    >
      <SelectTrigger class="w-60">
        <SelectValue placeholder="Select an animal" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem
          v-for="item in collection.items"
          :key="item.value"
          :item="item"
        >
          {{ item.label }}
        </SelectItem>
      </SelectContent>
    </Select>
  </div>
</template>
