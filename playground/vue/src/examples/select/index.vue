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
} from '@raxium/vue/components/select'

const collection = createListCollection({
  items: Array.from({ length: 5 }, (_, index) => ({
    label: fakerEN.animal.bird(),
    value: index,
  })),
})

const groupCollection = createListCollection({
  items: Array.from({ length: 5 }, (_, index) => ({
    label: fakerEN.animal.cat(),
    value: `cat-${index}`,
    type: 'cat',
  })).concat(
    Array.from({ length: 5 }, (_, index) => ({
      label: fakerEN.animal.bird(),
      value: `bird-${index}`,
      type: 'bird',
    })),
  ),
  groupBy: item => item.type,
})
</script>

<template>
  <div class="flex items-center gap-4">
    <Select :collection="collection">
      <SelectTrigger>
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

    <Select :collection="groupCollection" size="sm">
      <SelectTrigger>
        <SelectValue placeholder="Select an animal" />
      </SelectTrigger>
      <SelectContent>
        <SelectItemGroup
          v-for="[type, group] in groupCollection.group()"
          :key="type"
          :label="type === 'cat' ? 'Cats' : 'Birds'"
        >
          <SelectItem v-for="item in group" :key="item.value" :item="item">
            {{ item.label }}
          </SelectItem>
        </SelectItemGroup>
      </SelectContent>
    </Select>

    <Select :collection="collection" multiple>
      <SelectTrigger clearable>
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
