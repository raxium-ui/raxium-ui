<script setup lang="ts">
import { Skeleton } from '../index'
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex flex-col gap-2">
      <div class="text-sm text-hcc">
        variant=pulse
      </div>
      <Skeleton class="h-4 w-64" variant="pulse" />
    </div>

    <div class="flex flex-col gap-2">
      <div class="text-sm text-hcc">
        variant=wave
      </div>
      <Skeleton class="h-4 w-64" variant="wave" />
    </div>
  </div>
</template>

