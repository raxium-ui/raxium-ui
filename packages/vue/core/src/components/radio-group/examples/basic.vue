<script setup lang="ts">
import { fakerEN } from '@faker-js/faker'
import { ref } from 'vue'
import { RadioGroup, RadioGroupItem } from '../index'

const items = Array.from({ length: 5 }, (_, i) => {
  const cat = fakerEN.animal.cat()
  return { label: cat, value: i }
})
const value = ref<number>(items[1]?.value)
</script>

<template>
  <div class="w-full flex flex-col gap-3">
    <div class="text-sm text-hff">
      value: {{ value }}
    </div>

    <RadioGroup v-model="value">
      <RadioGroupItem
        v-for="item in items"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </RadioGroup>
  </div>
</template>
