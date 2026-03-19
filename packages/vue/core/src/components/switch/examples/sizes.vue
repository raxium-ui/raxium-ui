<script setup lang="ts">
import { THEME_SIZE } from '@raxium/shared/constant'
import { Switch } from '../index'
</script>

<template>
  <div class="w-full flex flex-wrap items-center gap-6">
    <div v-for="size in THEME_SIZE" :key="size" class="flex items-center gap-2">
      <span class="text-sm text-hff">{{ size }}</span>
      <Switch :theme="{ size }" />
    </div>
  </div>
</template>
