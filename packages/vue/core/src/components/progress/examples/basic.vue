<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '../../button'
import { Progress, ProgressLinear } from '../index'

const value = ref(30)
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex items-center gap-3">
      <Button variant="outline" @click="value = Math.max(0, value - 10)">
        -10
      </Button>
      <Button variant="outline" @click="value = Math.min(100, value + 10)">
        +10
      </Button>
      <span class="text-sm text-hff">value: {{ value }}</span>
    </div>

    <Progress class="w-80" :model-value="value">
      <ProgressLinear />
    </Progress>
  </div>
</template>
