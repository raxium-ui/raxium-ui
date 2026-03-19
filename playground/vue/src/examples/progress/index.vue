<script setup lang="ts">
import type { ThemeProps } from '@raxium/vue/providers/theme'
import { Button } from '@raxium/vue/components/button'
import {
  Progress,
  ProgressArc,
  ProgressCircle,
  ProgressLinear,
} from '@raxium/vue/components/progress'
import { onUnmounted, ref } from 'vue'

const progressValue = ref(0)
const timer = ref<ReturnType<typeof setInterval> | null>(null)
const isStart = ref(false)

function onStart() {
  if (isStart.value) {
    if (timer.value) {
      clearInterval(timer.value)
      timer.value = null
    }
    isStart.value = false
    return
  }
  isStart.value = true
  timer.value = setInterval(() => {
    progressValue.value += 5
    if (progressValue.value > 100) {
      progressValue.value = 0
    }
  }, 1000)
}

onUnmounted(() => {
  if (timer.value) {
    clearInterval(timer.value)
    timer.value = null
  }
})
</script>

<template>
  <div>
    <Button
      class="mb-4"
      @click="onStart"
    >
      {{ isStart ? 'Stop' : 'Start' }}
    </Button>
    <div class="flex items-start gap-4">
      <div class="flex flex-col items-center justify-center gap-4">
        <Progress
          class="w-75 shrink-0"
          :model-value="progressValue"
        >
          <ProgressLinear />
        </Progress>
        <div class="flex items-center gap-4">
          <Progress
            v-for="size in ['sm', 'base', 'lg']"
            :key="size"
            :model-value="progressValue"
          >
            <ProgressCircle :size="size as ThemeProps['size']" />
          </Progress>
        </div>
      </div>
      <div class="flex flex-col items-center justify-center gap-4">
        <Progress
          class="w-75 shrink-0"
          :model-value="progressValue"
        >
          <ProgressLinear variant="robbin" />
        </Progress>
        <div class="flex items-center gap-4">
          <Progress
            v-for="size in ['sm', 'base', 'lg']"
            :key="size"
            :model-value="progressValue"
          >
            <ProgressArc :size="size as ThemeProps['size']" variant="transfer" />
          </Progress>
        </div>
      </div>
      <div class="flex flex-col items-center justify-center gap-4">
        <Progress
          class="w-75 shrink-0"
          :model-value="progressValue"
        >
          <ProgressLinear variant="transfer" />
        </Progress>
        <div class="flex items-center gap-4">
          <Progress
            v-for="size in ['sm', 'base', 'lg']"
            :key="size"
            :model-value="progressValue"
          >
            <ProgressCircle
              :size="size as any"
              variant="transfer"
            />
          </Progress>
        </div>
      </div>
    </div>
  </div>
</template>
