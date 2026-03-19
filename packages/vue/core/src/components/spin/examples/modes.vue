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
        <Button variant="outline" @click="showInline = !showInline">
          Toggle inline
        </Button>
        <Button variant="outline" @click="showFullscreen = !showFullscreen">
          Toggle fullscreen
        </Button>
        <div class="text-sm text-hcc">
          inline: {{ showInline }} / fullscreen: {{ showFullscreen }}
        </div>
      </div>

      <div class="relative w-full max-w-[520px] rounded-md border border-h33 p-4">
        <div class="text-sm text-hcc">
          Inline 模式：覆盖父元素
        </div>
        <div class="mt-3 h-24 rounded bg-h0f" />
        <Spin :show="showInline" mode="inline" />
      </div>

      <div class="text-sm text-hcc">
        Fullscreen 模式：覆盖全屏（点击上方按钮触发）
      </div>
      <Spin :show="showFullscreen" mode="fullscreen" />
    </div>
  </SpinProvider>
</template>
