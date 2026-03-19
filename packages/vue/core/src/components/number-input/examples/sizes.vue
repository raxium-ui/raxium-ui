<script setup lang="ts">
import { THEME_SIZE } from '@raxium/shared/constant'
import { ref } from 'vue'
import { NumberInput } from '../index'

const value = ref('10')
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="text-sm text-hcc">
      sm / base / lg（showTrigger=true）
    </div>

    <div class="w-full max-w-[520px] flex flex-col gap-3 rounded-md border border-h33 p-3">
      <NumberInput
        v-for="size in THEME_SIZE"
        :key="size"
        v-model="value"
        :theme="{ size }"
        show-trigger
        :min="0"
        :max="100"
        :step="1"
      />
    </div>
  </div>
</template>
