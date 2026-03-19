<script setup lang="ts">
import { THEME_SIZE } from '@raxium/shared/constant'
import { Toggle } from '../index'
</script>

<template>
  <div class="w-full flex flex-wrap items-center gap-4">
    <Toggle v-for="size in THEME_SIZE" :key="size" :theme="{ size }">
      size={{ size }}
    </Toggle>
  </div>
</template>
