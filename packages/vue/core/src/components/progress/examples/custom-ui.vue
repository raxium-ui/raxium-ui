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
          track: 'bg-h22 border border-h55',
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
          track: 'bg-h22 border border-h55',
          range: 'bg-rz-green',
        }"
      />
    </Progress>
  </div>
</template>

