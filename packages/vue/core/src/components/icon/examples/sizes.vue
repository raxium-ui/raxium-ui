<script setup lang="ts">
import { Icon } from '../index'
</script>

<template>
  <div class="flex items-center gap-6">
    <div class="flex items-center gap-2 text-xs">
      <Icon icon="lucide:star" />
      <span class="text-gray-ff">xs</span>
    </div>
    <div class="flex items-center gap-2 text-sm">
      <Icon icon="lucide:star" />
      <span class="text-gray-ff">sm</span>
    </div>
    <div class="flex items-center gap-2 text-base">
      <Icon icon="lucide:star" />
      <span class="text-gray-ff">base</span>
    </div>
    <div class="flex items-center gap-2 text-lg">
      <Icon icon="lucide:star" />
      <span class="text-gray-ff">lg</span>
    </div>
  </div>
</template>
