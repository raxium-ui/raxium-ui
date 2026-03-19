<script setup lang="ts">
import { createListCollection } from '@ark-ui/vue/select'
import { fakerEN } from '@faker-js/faker'
import { ref } from 'vue'
import { Button } from '../../button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../index'

const collection = createListCollection({
  items: Array.from({ length: 8 }, (_, index) => ({
    label: fakerEN.animal.bird(),
    value: `bird-${index}`,
  })),
})

const open = ref(false)
const highlightedValue = ref<string>()
const modelValue = ref<string[]>([])
</script>

<template>
  <div class="w-full flex flex-col gap-3">
    <div class="flex items-center gap-3">
      <Button variant="outline" @click="open = !open">
        Toggle open: {{ open }}
      </Button>
      <span class="text-sm text-hff">highlighted: {{ highlightedValue ?? 'null' }}</span>
    </div>

    <Select
      v-model="modelValue"
      v-model:open="open"
      v-model:highlighted-value="highlightedValue"
      :collection="collection"
    >
      <SelectTrigger class="w-70" clearable>
        <SelectValue placeholder="Controlled open + highlightedValue" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem v-for="item in collection.items" :key="item.value" :item="item">
          {{ item.label }}
        </SelectItem>
      </SelectContent>
    </Select>
  </div>
</template>
