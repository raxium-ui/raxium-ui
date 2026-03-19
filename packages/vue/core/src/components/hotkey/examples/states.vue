<script setup lang="ts">
import { ref } from 'vue'
import { Hotkey } from '../index'

const normal = ref('Ctrl + Shift + K')
</script>

<template>
  <div class="w-full flex flex-col gap-3">
    <Hotkey v-model:hotkey="normal" class="w-80" />
    <Hotkey hotkey="" class="w-80" disabled />
    <Hotkey hotkey="Ctrl + Shift + P" class="w-80" readonly />
  </div>
</template>

