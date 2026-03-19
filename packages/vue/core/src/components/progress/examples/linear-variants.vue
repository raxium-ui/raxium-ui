<script setup lang="ts">
import { ref } from 'vue'
import { Progress, ProgressLinear } from '../index'

const value = ref(45)
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex items-center gap-4">
      <Progress class="w-80" :model-value="value">
        <ProgressLinear variant="default" />
      </Progress>
      <span class="text-sm text-hff">default</span>
    </div>

    <div class="flex items-center gap-4">
      <Progress class="w-80" :model-value="value">
        <ProgressLinear variant="robbin" />
      </Progress>
      <span class="text-sm text-hff">robbin</span>
    </div>

    <div class="flex items-center gap-4">
      <Progress class="w-80" :model-value="value">
        <ProgressLinear variant="transfer" />
      </Progress>
      <span class="text-sm text-hff">transfer</span>
    </div>
  </div>
</template>
