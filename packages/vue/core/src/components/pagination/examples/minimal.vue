<script setup lang="ts">
import { ref } from 'vue'
import { Pagination } from '../index'

const page = ref(1)
</script>

<template>
  <div class="w-full flex flex-col gap-2">
    <div class="text-sm text-hcc">
      page: <span class="text-hff">{{ page }}</span>
    </div>

    <div class="w-full max-w-[720px] rounded-md border border-h33 p-3">
      <Pagination v-model:page="page" :count="80" :default-page-size="10" :sibling-count="1" />
    </div>
  </div>
</template>

