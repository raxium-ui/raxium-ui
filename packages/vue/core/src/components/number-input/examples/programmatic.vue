<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '../../button'
import { NumberInput } from '../index'

const value = ref('10')
const inputRef = ref<any>(null)
</script>

<template>
  <div class="w-full flex flex-col gap-3">
    <div class="flex flex-wrap items-center gap-2">
      <Button variant="outline" @click="inputRef?.$api?.focus()">
        Focus
      </Button>
      <Button variant="outline" @click="inputRef?.$api?.decrement()">
        - step
      </Button>
      <Button variant="outline" @click="inputRef?.$api?.increment()">
        + step
      </Button>
      <Button variant="outline" @click="inputRef?.$api?.setToMin()">
        Set min
      </Button>
      <Button variant="outline" @click="inputRef?.$api?.setToMax()">
        Set max
      </Button>
      <Button variant="outline" @click="inputRef?.$api?.clearValue()">
        Clear
      </Button>
      <div class="text-sm text-hcc">
        value: <span class="text-hff">{{ value || '(empty)' }}</span>
      </div>
    </div>

    <div class="w-full max-w-[520px] rounded-md border border-h33 p-3">
      <NumberInput ref="inputRef" v-model="value" show-trigger :min="0" :max="20" :step="5" />
    </div>
  </div>
</template>
