<script setup lang="ts">
import { THEME_SIZE } from '@raxium/shared/constant'
import { ref } from 'vue'
import { Pagination } from '../index'

const page = ref(1)
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="text-sm text-hcc">
      sm / base / lg
    </div>

    <div class="w-full max-w-[720px] flex flex-col gap-3 rounded-md border border-h33 p-3">
      <Pagination
        v-for="size in THEME_SIZE"
        :key="size"
        v-model:page="page"
        :theme="{ size }"
        :count="200"
        :default-page-size="10"
        :sibling-count="1"
      />
    </div>
  </div>
</template>
