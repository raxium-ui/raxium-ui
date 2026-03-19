<script setup lang="ts">
import { createListCollection } from '@ark-ui/vue/select'
import { fakerEN } from '@faker-js/faker'
import { THEME_SIZE } from '@raxium/shared/constant'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../index'

const collection = createListCollection({
  items: Array.from({ length: 5 }, (_, index) => ({
    label: fakerEN.animal.dog(),
    value: `dog-${index}`,
  })),
})
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <Select v-for="size in THEME_SIZE" :key="String(size)" :collection="collection" :theme="{ size }">
      <SelectTrigger class="w-60">
        <SelectValue :placeholder="`size=${String(size)}`" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem v-for="item in collection.items" :key="item.value" :item="item">
          {{ item.label }}
        </SelectItem>
      </SelectContent>
    </Select>
  </div>
</template>
