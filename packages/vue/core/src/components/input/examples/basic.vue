<script setup lang="ts">
import { ref } from 'vue'
import { Input } from '../index'

const text = ref('')
</script>

<template>
  <div class="w-full flex flex-col gap-3">
    <Input class="w-60" default-value="Default Value" />
    <Input class="w-60" placeholder="Placeholder" />

    <div class="flex items-center gap-3">
      <Input v-model="text" class="w-60" placeholder="v-model" />
      <span class="text-sm text-hff">value: {{ text }}</span>
    </div>
  </div>
</template>
