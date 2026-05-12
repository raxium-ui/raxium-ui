<script setup lang="ts">
import { ref } from 'vue'
import { Pagination, PaginationGoTo, PaginationGoToTrigger, PaginationPageSize } from '../index'

const page = ref(1)
</script>

<template>
  <div class="w-full flex flex-col gap-2">
    <div class="text-sm text-gray-cc">
      page: <span class="text-gray-ff">{{ page }}</span>
    </div>

    <div class="w-full max-w-[720px] rounded-md border border-gray-33 p-3">
      <Pagination
        v-model:page="page"
        :count="10000"
        :default-page-size="10"
        :sibling-count="1"
        :dynamic-page-end="20"
      >
        <PaginationGoTo>
          <template #suffix>
            <PaginationGoToTrigger>
              <span class="text-sm text-rz-green hover:text-rz-green-light hover:underline">
                GO
              </span>
            </PaginationGoToTrigger>
          </template>
        </PaginationGoTo>
        <PaginationPageSize>
          <template #prefix>
            <span class="text-sm text-gray-cc">每页</span>
          </template>
          <template #suffix>
            <span class="text-sm text-gray-cc">条</span>
          </template>
        </PaginationPageSize>
      </Pagination>
    </div>
  </div>
</template>
