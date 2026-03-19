<script setup lang="ts">
import { ref } from 'vue'
import { RadioGroup, RadioGroupItem } from '../index'

const value = ref<string | undefined>('a')
</script>

<template>
  <div class="w-full flex flex-col gap-6">
    <div class="flex flex-col gap-2">
      <div class="text-sm text-hff">
        Horizontal + disabled item
      </div>
      <RadioGroup v-model="value">
        <RadioGroupItem label="Option A" value="a" />
        <RadioGroupItem label="Option B (disabled)" value="b" disabled />
        <RadioGroupItem label="Option C" value="c" />
      </RadioGroup>
    </div>

    <div class="flex flex-col gap-2">
      <div class="text-sm text-hff">
        Vertical
      </div>
      <RadioGroup v-model="value" orientation="vertical" class="flex flex-col gap-2 items-start">
        <RadioGroupItem label="Option A" value="a" />
        <RadioGroupItem label="Option B" value="b" />
        <RadioGroupItem label="Option C" value="c" />
      </RadioGroup>
    </div>
  </div>
</template>
