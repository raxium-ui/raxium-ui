<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox, CheckboxGroup } from '../index'

const stringValue = ref<string[]>([])
const numberValue = ref<number[]>([])

function onString(value: string[]) {
  stringValue.value = value
}

function onNumber(value: number[]) {
  numberValue.value = value
}
</script>

<template>
  <CheckboxGroup :model-value="stringValue" @update:model-value="onString">
    <Checkbox value="a" label="A" />
  </CheckboxGroup>
  <CheckboxGroup :model-value="numberValue" @update:model-value="onNumber">
    <Checkbox :value="1" label="One" />
  </CheckboxGroup>
</template>
