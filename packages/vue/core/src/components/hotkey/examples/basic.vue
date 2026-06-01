<script setup lang="ts">
import { ref } from 'vue'
import { Hotkey } from '../index'

const hotkey = ref('')
</script>

<template>
  <div class="w-full flex flex-col gap-2">
    <Hotkey v-model:hotkey="hotkey" class="w-80" />
    <div class="text-sm text-gray-cc">
      hotkey: <span class="text-gray-ff">{{ hotkey || '(empty)' }}</span>
    </div>
  </div>
</template>
