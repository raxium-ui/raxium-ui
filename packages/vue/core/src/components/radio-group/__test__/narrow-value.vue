<script setup lang="ts">
import { ref } from 'vue'
import { RadioGroup, RadioGroupItem } from '../index'

const stringValue = ref('a')
const numberValue = ref(1)

function onString(value: string) {
  stringValue.value = value
}

function onNumber(value: number) {
  numberValue.value = value
}
</script>

<template>
  <RadioGroup :model-value="stringValue" @update:model-value="onString">
    <RadioGroupItem value="a" text="A" />
  </RadioGroup>
  <RadioGroup :model-value="numberValue" @update:model-value="onNumber">
    <RadioGroupItem :value="1" text="One" />
  </RadioGroup>
</template>
