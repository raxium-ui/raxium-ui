<script setup lang="ts">
import { THEME_SIZE } from '@raxium/shared/constant'
import { ref } from 'vue'
import { Progress, ProgressLinear } from '../index'

const value = ref(65)
</script>

<template>
  <div class="w-full flex flex-col gap-6">
    <div class="flex flex-col gap-3">
      <div class="text-sm text-hff">
        Horizontal sizes
      </div>
      <Progress
        v-for="size in THEME_SIZE"
        :key="String(size)"
        class="w-80"
        :model-value="value"
        :theme="{ size }"
      >
        <ProgressLinear />
      </Progress>
    </div>

    <div class="flex flex-col gap-3">
      <div class="text-sm text-hff">
        Vertical sizes
      </div>
      <div class="flex items-end gap-6">
        <Progress
          v-for="size in THEME_SIZE"
          :key="`v-${String(size)}`"
          class="h-30"
          orientation="vertical"
          :model-value="value"
          :theme="{ size }"
        >
          <ProgressLinear />
        </Progress>
      </div>
    </div>
  </div>
</template>
