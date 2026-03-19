<script setup lang="ts">
import { Skeleton } from '../index'
</script>

<template>
  <div class="w-full max-w-[560px] rounded-md border border-h33 p-4">
    <div class="flex items-center gap-3">
      <Skeleton class="size-12" shape="circle" />
      <div class="flex flex-1 flex-col gap-2">
        <Skeleton class="h-4 w-40" />
        <Skeleton class="h-4 w-64" />
      </div>
    </div>

    <div class="mt-4 flex flex-col gap-2">
      <Skeleton class="h-28 w-full">
        <div class="h-full w-full rounded bg-h0f" />
      </Skeleton>
      <div class="text-xs text-h55">
        这里演示 Skeleton 包裹 children（便于对比布局占位）
      </div>
    </div>
  </div>
</template>

