<script setup lang="ts">
import { THEME_SIZE } from '@raxium/shared/constant'
import { PinInput } from '../index'
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="text-sm text-gray-cc">
      xs / sm / base / lg
    </div>

    <div class="flex flex-col gap-3">
      <PinInput
        v-for="size in THEME_SIZE"
        :key="size"
        :theme="{ size }"
        :count="4"
        placeholder="○"
      />
    </div>
  </div>
</template>
