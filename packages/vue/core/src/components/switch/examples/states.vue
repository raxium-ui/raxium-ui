<script setup lang="ts">
import { Switch } from '../index'
</script>

<template>
  <div class="w-full flex flex-wrap items-center gap-6">
    <div class="flex items-center gap-2">
      <span class="text-sm text-gray-ff">unchecked</span>
      <Switch />
    </div>

    <div class="flex items-center gap-2">
      <span class="text-sm text-gray-ff">checked</span>
      <Switch checked />
    </div>

    <div class="flex items-center gap-2">
      <span class="text-sm text-gray-ff">disabled</span>
      <Switch disabled />
    </div>

    <div class="flex items-center gap-2">
      <span class="text-sm text-gray-ff">disabled + checked</span>
      <Switch disabled checked />
    </div>
  </div>
</template>
