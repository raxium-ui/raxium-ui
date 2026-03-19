<script setup lang="ts">
import { fakerEN } from '@faker-js/faker'
import { VirtualList, VirtualListItem } from '../index'

const longNameList = Array.from({ length: 1000 })
  .fill(0)
  .map(() => fakerEN.person.fullName())
</script>

<template>
  <div class="w-full flex flex-col items-center gap-3">
    <div>
      <p class="pb-2 text-[#00ff9f]">
        Vertical Virtual List
      </p>
      <VirtualList
        class="w-100 h-100 border border-[#555555] rounded-md"
        :data-source="longNameList"
      >
        <VirtualListItem v-slot="{ data, index }">
          {{ `${data} @ ${index}` }}
        </VirtualListItem>
      </VirtualList>
    </div>

    <div class="flex-1">
      <p class="pb-2 text-[#00ff9f]">
        Horizontal Virtual List
      </p>
      <VirtualList
        class="w-100 h-25 border border-[#555555] rounded-md"
        :data-source="longNameList"
        horizontal
        :estimate-size="() => 100"
      >
        <VirtualListItem v-slot="{ data, index }">
          {{ `${data} @ ${index}` }}
        </VirtualListItem>
      </VirtualList>
    </div>
  </div>
</template>
