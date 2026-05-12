<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '../../button'
import { Spin, SpinProvider } from '../index'

const showInline = ref(true)
const showFullscreen = ref(false)
</script>

<template>
  <SpinProvider>
    <div class="w-full flex flex-col gap-3">
      <div class="flex items-center gap-2">
        <Button variant="outlined" @click="showInline = !showInline">
          Toggle inline
        </Button>
        <Button variant="outlined" @click="showFullscreen = !showFullscreen">
          Toggle fullscreen
        </Button>
        <div class="text-sm text-gray-cc">
          inline: {{ showInline }} / fullscreen: {{ showFullscreen }}
        </div>
      </div>

      <div class="relative w-full rounded-md border border-gray-33 p-4">
        <div class="text-sm text-gray-cc">
          Inline 模式：覆盖父元素
        </div>
        <Spin :show="showInline" mode="inline" />
      </div>

      <div class="text-sm text-gray-cc">
        Fullscreen 模式：覆盖全屏（点击上方按钮触发）
      </div>
      <Spin :show="showFullscreen" mode="fullscreen" />
    </div>
  </SpinProvider>
</template>
