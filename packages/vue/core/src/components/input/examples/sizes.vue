<script setup lang="ts">
import { THEME_SIZE } from '@raxium/shared/constant'
import { Input } from '../index'
</script>

<template>
  <div class="w-full flex flex-col gap-3">
    <Input
      v-for="size in THEME_SIZE"
      :key="size"
      class="w-60"
      :theme="{ size }"
      :placeholder="size"
    />
  </div>
</template>
