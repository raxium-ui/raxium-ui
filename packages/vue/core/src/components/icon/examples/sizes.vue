<script setup lang="ts">
import { Icon } from '../index'
</script>

<template>
  <div class="flex items-center gap-6">
    <div class="flex items-center gap-2 text-xs">
      <Icon icon="lucide:star" />
      <span class="text-hff">xs</span>
    </div>
    <div class="flex items-center gap-2 text-sm">
      <Icon icon="lucide:star" />
      <span class="text-hff">sm</span>
    </div>
    <div class="flex items-center gap-2 text-base">
      <Icon icon="lucide:star" />
      <span class="text-hff">base</span>
    </div>
    <div class="flex items-center gap-2 text-lg">
      <Icon icon="lucide:star" />
      <span class="text-hff">lg</span>
    </div>
  </div>
</template>
