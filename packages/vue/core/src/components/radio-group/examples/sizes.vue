<script setup lang="ts">
import { fakerEN } from '@faker-js/faker'
import { THEME_SIZE } from '@raxium/shared/constant'
import { ref } from 'vue'
import { RadioGroup, RadioGroupItem } from '../index'

const items = Array.from({ length: 3 }, () => {
  const bird = fakerEN.animal.bird()
  return { label: bird, value: bird }
})
const value = ref<string | undefined>(items[0]?.value)
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div v-for="size in THEME_SIZE" :key="String(size)" class="flex items-center gap-4">
      <span class="w-10 text-xs text-hff">{{ size }}</span>
      <RadioGroup v-model="value" :theme="{ size }">
        <RadioGroupItem
          v-for="item in items"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </RadioGroup>
    </div>
  </div>
</template>
