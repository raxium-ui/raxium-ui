<script setup lang="ts">
import { createListCollection } from '@ark-ui/vue/select'
import { fakerEN } from '@faker-js/faker'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectItemGroup,
  SelectTrigger,
  SelectValue,
} from '../index'

const groupCollection = createListCollection({
  items: Array.from({ length: 5 }, (_, index) => ({
    label: fakerEN.animal.cat(),
    value: `cat-${index}`,
    type: 'cat',
    disabled: index === 0,
  })).concat(
    Array.from({ length: 5 }, (_, index) => ({
      label: fakerEN.animal.bird(),
      value: `bird-${index}`,
      type: 'bird',
      disabled: index === 0,
    })),
  ),
  groupBy: item => item.type,
})
</script>

<template>
  <Select :collection="groupCollection">
    <SelectTrigger class="w-70">
      <SelectValue placeholder="Select an animal" />
    </SelectTrigger>
    <SelectContent>
      <SelectItemGroup
        v-for="[type, group] in groupCollection.group()"
        :key="type"
        :label="type === 'cat' ? 'Cats' : 'Birds'"
      >
        <SelectItem v-for="(item, index) in group" :key="item.value" :item="item">
          {{ item.label }} <span v-if="index === 0" class="opacity-60">(disabled)</span>
        </SelectItem>
      </SelectItemGroup>
    </SelectContent>
  </Select>
</template>
