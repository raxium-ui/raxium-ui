<script setup lang="ts">
import { THEME_SIZE } from '@raxium/shared/constant'
import { ref } from 'vue'
import { Hotkey } from '../index'

const value = ref('')
</script>

<template>
  <div class="w-full flex flex-col gap-3">
    <div v-for="size in THEME_SIZE" :key="size" class="flex items-center gap-3">
      <div class="w-18 text-sm text-hcc">
        {{ size }}
      </div>
      <Hotkey v-model:hotkey="value" class="w-80" :theme="{ size }" />
    </div>
  </div>
</template>
