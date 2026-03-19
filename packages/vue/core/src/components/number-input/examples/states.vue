<script setup lang="ts">
import { ref } from 'vue'
import { NumberInput } from '../index'

const normal = ref('10')
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="w-full max-w-[520px] flex flex-col gap-3">
      <div class="text-sm text-hcc">
        Normal
      </div>
      <div class="rounded-md border border-h33 p-3">
        <NumberInput v-model="normal" show-trigger :min="0" :max="100" :step="5" />
      </div>

      <div class="text-sm text-hcc">
        Disabled
      </div>
      <div class="rounded-md border border-h33 p-3">
        <NumberInput default-value="10" disabled show-trigger />
      </div>

      <div class="text-sm text-hcc">
        ReadOnly
      </div>
      <div class="rounded-md border border-h33 p-3">
        <NumberInput default-value="10" read-only show-trigger />
      </div>

      <div class="text-sm text-hcc">
        Invalid（仅展示状态）
      </div>
      <div class="rounded-md border border-h33 p-3">
        <NumberInput default-value="10" invalid show-trigger />
      </div>
    </div>
  </div>
</template>

