<script setup lang="ts">
import { THEME_SIZE } from '@raxium/shared/constant'
import { ref } from 'vue'
import { Progress, ProgressArc, ProgressCircle } from '../index'

const value = ref(70)
</script>

<template>
  <div class="w-full flex flex-col gap-6">
    <div class="flex flex-col gap-3">
      <div class="text-sm text-hff">
        Circle (default)
      </div>
      <div class="flex items-center gap-4">
        <Progress
          v-for="size in THEME_SIZE"
          :key="String(size)"
          :model-value="value"
        >
          <ProgressCircle :theme="{ size }" />
        </Progress>
        <Progress :model-value="value">
          <ProgressCircle :theme="{ size: 120 }" />
        </Progress>
      </div>
    </div>

    <div class="flex flex-col gap-3">
      <div class="text-sm text-hff">
        Circle (transfer)
      </div>
      <div class="flex items-center gap-4">
        <Progress
          v-for="size in THEME_SIZE"
          :key="`t-${String(size)}`"
          :model-value="value"
        >
          <ProgressCircle
            :theme="{ size }"
            variant="transfer"
          />
        </Progress>
      </div>
    </div>

    <div class="flex flex-col gap-3">
      <div class="text-sm text-hff">
        Arc (transfer + theta)
      </div>
      <div class="flex items-center gap-4">
        <Progress
          v-for="size in THEME_SIZE"
          :key="`a-${String(size)}`"
          :model-value="value"
        >
          <ProgressArc
            :theme="{ size }"
            variant="transfer"
            :theta="60"
          />
        </Progress>
        <Progress :model-value="value">
          <ProgressArc
            :theme="{ size: 120 }"
            variant="transfer"
            :theta="120"
          />
        </Progress>
      </div>
    </div>
  </div>
</template>
