<script setup lang="ts">
import { fakerEN } from '@faker-js/faker'
import { ref } from 'vue'
import { RadioGroup, RadioGroupItem } from '../index'

const items = Array.from({ length: 6 }, () => {
  const fruit = fakerEN.food.fruit()
  return { label: fruit, value: fruit }
})
const value = ref<string | undefined>(items[0]?.value)
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="text-sm text-hff">
      Mixed variants
    </div>
    <RadioGroup v-model="value">
      <RadioGroupItem
        v-for="(item, index) in items"
        :key="item.value"
        :variant="index % 2 === 0 ? 'default' : 'checkbox'"
        :label="item.label"
        :value="item.value"
      />
    </RadioGroup>
  </div>
</template>
