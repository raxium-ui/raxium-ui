<script setup lang="ts">
import { ref } from 'vue'
import { Progress, ProgressLinear } from '../index'

const value = ref(35)
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <Progress
      class="w-80"
      :model-value="value"
    >
      <ProgressLinear
        :ui="{
          track: 'bg-gray-22 border border-gray-55',
          range: 'bg-rz-green',
        }"
      />
    </Progress>

    <Progress
      class="w-80"
      :model-value="value"
    >
      <ProgressLinear
        variant="transfer"
        :ui="{
          track: 'bg-gray-22 border border-gray-55',
          range: 'bg-rz-green',
        }"
      />
    </Progress>
  </div>
</template>
