<script setup lang="ts">
import { Icon } from '../index'
</script>

<template>
  <div class="flex items-center gap-6">
    <div class="flex items-center gap-2">
      <Icon icon="lucide:circle" class="text-rz-green" />
      <span class="text-xs text-hff">text-* controls color</span>
    </div>

    <div class="flex items-center gap-2">
      <Icon icon="lucide:circle" class="text-h55" />
      <span class="text-xs text-hff">muted</span>
    </div>

    <div class="flex items-center gap-2">
      <Icon icon="lucide:circle" class="text-rz-red" />
      <span class="text-xs text-hff">alert</span>
    </div>

    <div class="flex items-center gap-2">
      <Icon icon="lucide:circle" class="[&>svg]:stroke-3" />
      <span class="text-xs text-hff">custom stroke</span>
    </div>
  </div>
</template>
