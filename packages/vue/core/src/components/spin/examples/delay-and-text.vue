<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '../../button'
import { Spin, SpinProvider } from '../index'

const show = ref(true)
</script>

<template>
  <SpinProvider>
    <div class="w-full flex flex-col gap-3">
      <div class="flex items-center gap-2">
        <Button variant="outlined" @click="show = true">
          Show
        </Button>
        <Button variant="outlined" @click="show = false">
          Hide (delay 1000ms)
        </Button>
        <div class="text-sm text-gray-cc">
          show: {{ show }}
        </div>
      </div>

      <div class="relative w-full max-w-[520px] rounded-md border border-gray-33 p-4">
        <div class="text-sm text-gray-cc">
          这里模拟一个加载区域
        </div>
        <div class="mt-3 h-24 rounded bg-gray-0c" />

        <Spin :show="show" mode="inline" :delay="1000">
          <template #text>
            Loading...
          </template>
        </Spin>
      </div>
    </div>
  </SpinProvider>
</template>
