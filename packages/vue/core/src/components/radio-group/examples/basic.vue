<script setup lang="ts">
import { fakerEN } from '@faker-js/faker'
import { ref } from 'vue'
import { RadioGroup, RadioGroupItem, RadioGroupLayout } from '../index'

const items = Array.from({ length: 5 }, (_, i) => {
  const cat = fakerEN.animal.cat()
  return { text: cat, value: i }
})
const value = ref<number>(items[1]?.value)
</script>

<template>
  <div class="w-full flex flex-col gap-3">
    <div class="text-sm text-gray-ff">
      value: {{ value }}
    </div>

    <RadioGroup v-model="value">
      <RadioGroupLayout layout="inline">
        <RadioGroupItem
          v-for="item in items"
          :key="item.value"
          :text="item.text"
          :value="item.value"
        />
      </RadioGroupLayout>
    </RadioGroup>

    <RadioGroup
      v-model="value"
      label="Basic"
    >
      <RadioGroupLayout layout="stack">
        <RadioGroupItem
          v-for="item in items"
          :key="item.value"
          :text="item.text"
          :value="item.value"
        />
      </RadioGroupLayout>
    </RadioGroup>

    <RadioGroup v-model="value">
      <template #label>
        <span>Custom Label</span>
      </template>
      <RadioGroupLayout layout="stack">
        <RadioGroupItem
          v-for="item in items"
          :key="item.value"
          :text="item.text"
          :value="item.value"
        />
      </RadioGroupLayout>
    </RadioGroup>
  </div>
</template>
