<script setup lang="ts">
import type { PinInputValueChangeDetails } from '@ark-ui/vue/pin-input'
import { ref } from 'vue'
import { PinInput } from '../index'

const value = ref<string[]>([])
const isComplete = ref(false)
const isInvalid = ref(false)

function onValueChange(details: PinInputValueChangeDetails) {
  value.value = details.value
  isInvalid.value = false
}

function onValueComplete(details: PinInputValueChangeDetails) {
  isComplete.value = true
  console.log('Complete:', details.valueAsString)
}

function onValueInvalid() {
  isInvalid.value = true
}
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="text-sm text-gray-cc flex flex-col gap-1">
      <div>value: <span class="text-gray-ff">{{ value.join('') || '(empty)' }}</span></div>
      <div>complete: <span :class="isComplete ? 'text-green-44' : 'text-gray-55'">{{ isComplete }}</span></div>
      <div>invalid: <span :class="isInvalid ? 'text-red-55' : 'text-gray-55'">{{ isInvalid }}</span></div>
    </div>

    <PinInput
      :count="4"
      type="numeric"
      placeholder="○"
      :invalid="isInvalid"
      @value-change="onValueChange"
      @value-complete="onValueComplete"
      @value-invalid="onValueInvalid"
    />
  </div>
</template>
