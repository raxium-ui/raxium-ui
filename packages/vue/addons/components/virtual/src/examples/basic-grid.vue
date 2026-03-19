<script setup lang="ts">
import type { LoadingStateHandler } from '../index'
import { fakerEN } from '@faker-js/faker'
import { ref } from 'vue'
import { VirtualGrid, VirtualGridItem, VirtualInfiniteLoading } from '../index'

const longNameList = Array.from({ length: 1000 })
  .fill(0)
  .map(() => fakerEN.person.fullName())

const asyncNameList = ref(
  Array.from({ length: 100 })
    .fill(0)
    .map(() => fakerEN.person.fullName()),
)
let requestCount = 0
async function loadMoreName($state: LoadingStateHandler) {
  $state.loading()
  await new Promise(resolve => setTimeout(resolve, 1000))
  asyncNameList.value.push(
    ...Array.from({ length: 1 })
      .fill(0)
      .map(() => fakerEN.lorem.sentence(5)),
  )
  console.log('requestCount', requestCount)
  $state.error()
  requestCount++
  if (requestCount >= 5)
    $state.error()
}
</script>

<template>
  <div class="w-full flex flex-col items-center gap-3">
    <div>
      <p class="pb-2 text-[#00ff9f]">
        Basic Virtual Grid
      </p>
      <VirtualGrid
        class="w-100 h-100 border border-[#555555] rounded-md"
        :data-source="longNameList"
        :row="20"
        :gap="[20, 20]"
      >
        <VirtualGridItem
          v-slot="{ data }"
          class="w-25 wrap-break-word overflow-hidden"
        >
          <div>{{ data }}</div>
        </VirtualGridItem>
      </VirtualGrid>
    </div>

    <div>
      <p class="pb-2 text-[#00ff9f]">
        Basic Virtual Grid with Infinite Loading
      </p>
      <VirtualGrid
        class="w-100 h-100 border border-[#555555] rounded-md"
        :data-source="asyncNameList"
        :row="20"
        :gap="[20, 20]"
      >
        <VirtualGridItem
          v-slot="{ data }"
          class="w-25 wrap-break-word"
        >
          <div>{{ data }}</div>
        </VirtualGridItem>
        <VirtualInfiniteLoading @infinite="loadMoreName" />
      </VirtualGrid>
    </div>
  </div>
</template>
