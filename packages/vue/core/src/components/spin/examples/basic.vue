<script setup lang="ts">
import { Spin, SpinProvider } from '../index'
</script>

<template>
  <SpinProvider>
    <div class="relative w-full max-w-[520px] rounded-md border border-h33 p-4">
      <div class="text-sm text-hcc">
        内容区域（inline 模式会覆盖在父元素上）
      </div>
      <div class="mt-3 h-24 rounded bg-h0f" />

      <Spin show mode="inline" />
    </div>
  </SpinProvider>
</template>

