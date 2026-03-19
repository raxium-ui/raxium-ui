<script setup lang="ts">
import { Skeleton } from '../index'
</script>

<template>
  <div class="w-full flex items-center gap-6">
    <div class="flex flex-col items-start gap-2">
      <div class="text-sm text-hcc">
        rect
      </div>
      <Skeleton class="h-14 w-56" shape="rect" />
    </div>

    <div class="flex flex-col items-start gap-2">
      <div class="text-sm text-hcc">
        circle
      </div>
      <Skeleton class="size-14" shape="circle" />
    </div>
  </div>
</template>

