<script setup lang="ts">
import { computed, ref } from 'vue'
import { Pagination, PaginationPageSize } from '../index'

const page = ref(1)
const pageSize = ref(10)
const total = 123

const totalPages = computed(() => Math.max(1, Math.ceil(total / pageSize.value)))
</script>

<template>
  <div class="w-full flex flex-col gap-2">
    <div class="text-sm text-hcc">
      page: <span class="text-hff">{{ page }}</span>
      / pageSize: <span class="text-hff">{{ pageSize }}</span>
      / totalPages: <span class="text-hff">{{ totalPages }}</span>
    </div>

    <div class="w-full max-w-[720px] rounded-md border border-h33 p-3">
      <Pagination
        v-model:page="page"
        v-model:page-size="pageSize"
        :count="total"
        :sibling-count="1"
      >
        <PaginationPageSize>
          <template #prefix>
            <span class="text-sm text-hcc">每页</span>
          </template>
          <template #suffix>
            <span class="text-sm text-hcc">条</span>
          </template>
        </PaginationPageSize>
      </Pagination>
    </div>
  </div>
</template>

