<script setup lang="ts">
import { computed, ref } from 'vue'
import { NumberInput } from '../index'

const value = ref('10')
const lines = ref<string[]>([])

function push(line: string) {
  lines.value = [line, ...lines.value].slice(0, 8)
}

const joined = computed(() => (lines.value.length ? lines.value.join('\n') : '（暂无事件）'))
</script>

<template>
  <div class="w-full flex flex-col gap-3">
    <div class="text-sm text-hcc">
      监听：focus-change / value-change / value-invalid / update:modelValue
    </div>

    <div class="w-full max-w-[520px] rounded-md border border-h33 p-3">
      <NumberInput
        v-model="value"
        show-trigger
        :min="0"
        :max="20"
        :step="5"
        @input-focus="push('input-focus')"
        @input-blur="push('input-blur')"
        @focus-change="(d) => push(`focus-change: focused=${d.focused} value=${d.value}`)"
        @value-change="(d) => push(`value-change: value=${d.value} number=${d.valueAsNumber}`)"
        @value-invalid="(d) => push(`value-invalid: reason=${d.reason} value=${d.value}`)"
        @update:model-value="(v) => push(`update:modelValue: ${v}`)"
      />
    </div>

    <pre class="w-full max-w-[520px] whitespace-pre-wrap rounded-md bg-h0f p-3 text-xs text-hcc">{{ joined }}</pre>
  </div>
</template>
