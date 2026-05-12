<script setup lang="ts">
import { computed, ref } from 'vue'
import { Pagination, PaginationPageSize } from '../index'

const page = ref(1)
const pageSize = ref(10)
const lines = ref<string[]>([])

function push(line: string) {
  lines.value = [line, ...lines.value].slice(0, 8)
}

const joined = computed(() => (lines.value.length ? lines.value.join('\n') : '（暂无事件）'))
</script>

<template>
  <div class="w-full flex flex-col gap-3">
    <div class="text-sm text-gray-cc">
      监听：page-change / page-size-change / update:page / update:pageSize
    </div>

    <div class="w-full max-w-[720px] rounded-md border border-gray-33 p-3">
      <Pagination
        v-model:page="page"
        v-model:page-size="pageSize"
        :count="123"
        :sibling-count="1"
        @page-change="(d) => push(`page-change: page=${d.page} pageSize=${d.pageSize}`)"
        @page-size-change="(d) => push(`page-size-change: pageSize=${d.pageSize}`)"
        @update:page="(p) => push(`update:page: ${p}`)"
        @update:page-size="(ps) => push(`update:pageSize: ${ps}`)"
      >
        <PaginationPageSize />
      </Pagination>
    </div>

    <pre class="w-full max-w-[720px] whitespace-pre-wrap rounded-md bg-gray-0c p-3 text-xs text-gray-cc">{{ joined }}</pre>
  </div>
</template>

