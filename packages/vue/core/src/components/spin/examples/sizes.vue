<script setup lang="ts">
import { THEME_SIZE } from '@raxium/shared/constant'
import { Spin, SpinProvider } from '../index'
</script>

<template>
  <SpinProvider>
    <div class="w-full flex flex-col gap-3">
      <div
        v-for="size in THEME_SIZE"
        :key="size"
        class="relative h-20 w-full max-w-[520px] shrink-0 rounded-md border border-h33"
      >
        <Spin show mode="inline" :theme="{ size }" />
      </div>
    </div>
  </SpinProvider>
</template>
