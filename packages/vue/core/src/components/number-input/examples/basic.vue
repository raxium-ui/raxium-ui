<script setup lang="ts">
import { ref } from 'vue'
import { NumberInput } from '../index'

const value = ref('10')
</script>

<template>
  <div class="w-full flex flex-col gap-2">
    <div class="text-sm text-hcc">
      value: <span class="text-hff">{{ value }}</span>
    </div>

    <div class="w-full max-w-[520px] rounded-md border border-h33 p-3">
      <NumberInput v-model="value" :min="0" :max="100" :step="5" />
    </div>
  </div>
</template>
