<script setup lang="ts">
import { ref } from 'vue'
import { Pagination } from '../index'

const page = ref(3)
</script>

<template>
  <div class="w-full flex flex-col gap-2">
    <div class="text-sm text-hcc">
      type=link（仅演示 href 生成）
    </div>

    <div class="w-full max-w-[720px] rounded-md border border-h33 p-3">
      <Pagination
        v-model:page="page"
        type="link"
        :count="120"
        :default-page-size="10"
        :get-page-url="({ page }) => `#page=${page}`"
      />
    </div>
  </div>
</template>

