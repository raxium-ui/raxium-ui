<script setup lang="ts">
import { ref } from 'vue'
import { PinInput } from '../index'

const value = ref<string[]>([])
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="text-sm text-gray-cc">
      value:
      <span class="text-gray-ff">{{ value.length ? value.join('') : '(empty)' }}</span>
    </div>

    <PinInput v-model="value" :count="4">
      <template #label>
        Verification Code
      </template>
    </PinInput>

    <PinInput v-model="value" :count="4">
      <template #label>
        Verification Code
      </template>
      <template #prefix>
        <span class="text-gray-cc">+86</span>
      </template>
      <template #suffix>
        <span class="text-gray-cc">.com</span>
      </template>
    </PinInput>
  </div>
</template>
