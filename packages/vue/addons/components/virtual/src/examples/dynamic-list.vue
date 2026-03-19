<script setup lang="ts">
import type { LoadingStateHandler } from '../index'
import { fakerEN } from '@faker-js/faker'
import { ref } from 'vue'
import { VirtualInfiniteLoading, VirtualList, VirtualListItem } from '../index'

const longSentenceList = Array.from({ length: 100 })
  .fill(0)
  .map(() => fakerEN.lorem.sentence({ min: 20, max: 70 }))

const asyncSentenceList = ref(
  Array.from({ length: 10 })
    .fill(0)
    .map(() => fakerEN.lorem.sentence({ min: 20, max: 70 })),
)

let requestCount = 0
async function loadMoreSentence($state: LoadingStateHandler) {
  $state.loading()
  await new Promise(resolve => setTimeout(resolve, 1000))
  asyncSentenceList.value.push(
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
        Dynamic Virtual List
      </p>

      <VirtualList
        class="w-100 h-100 border border-[#555555] rounded-md overflow-x-hidden"
        :gap="20"
        :data-source="longSentenceList"
      >
        <VirtualListItem
          v-slot="{ data }"
          class="w-full wrap-break-word overflow-hidden"
          dynamic
        >
          <div>{{ data }}</div>
        </VirtualListItem>
      </VirtualList>
    </div>

    <div>
      <p class="pb-2 text-[#00ff9f]">
        Dynamic Virtual List with Infinite Loading
      </p>
      <VirtualList
        class="w-100 h-100 border border-[#555555] rounded-md overflow-x-hidden"
        :gap="20"
        :data-source="asyncSentenceList"
      >
        <VirtualListItem
          v-slot="{ data }"
          class="w-full wrap-break-word overflow-hidden"
          dynamic
        >
          <div>{{ data }}</div>
        </VirtualListItem>
        <VirtualInfiniteLoading @infinite="loadMoreSentence" />
      </VirtualList>
    </div>
  </div>
</template>
