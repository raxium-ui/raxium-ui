<script setup lang="ts">
import { CircleDashed } from 'lucide-vue-next'
import { Spin, SpinProvider } from '../index'
</script>

<template>
  <SpinProvider>
    <template #icon="{ class: klass }">
      <CircleDashed class="animate-spin" :class="[klass]" />
    </template>

    <div class="relative w-full max-w-[520px] rounded-md border border-h33 p-4">
      <div class="text-sm text-hcc">
        使用 SpinProvider 的 #icon slot 自定义图标
      </div>
      <div class="mt-3 h-24 rounded bg-h0f" />
      <Spin show mode="inline">
        <template #text>
          Custom icon...
        </template>
      </Spin>
    </div>
  </SpinProvider>
</template>
