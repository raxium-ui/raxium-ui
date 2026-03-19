<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  DatePicker,
  DatePickerContent,
  DatePickerControl,
  DatePickerDayView,
  DatePickerTrigger,
  DatePickerValueText,
} from '../index'

const value = ref([])
const open = ref(false)
const lines = ref<string[]>([])

function push(line: string) {
  lines.value = [line, ...lines.value].slice(0, 8)
}

const joined = computed(() => (lines.value.length ? lines.value.join('\n') : '（暂无事件）'))
</script>

<template>
  <div class="w-full flex flex-col gap-3">
    <div class="text-sm text-hcc">
      监听：open-change / view-change / value-change / update:modelValue / update:open
    </div>

    <div class="w-full max-w-[520px] rounded-md border border-h33 p-3">
      <DatePicker
        v-model="value"
        v-model:open="open"
        @open-change="(d) => push(`open-change: open=${d.open}`)"
        @view-change="(d) => push(`view-change: view=${d.view}`)"
        @value-change="(d) => push(`value-change: ${d.value.map((v) => String(v)).join(', ')}`)"
        @update:model-value="(v) => push(`update:modelValue: len=${v.length}`)"
        @update:open="(o) => push(`update:open: ${o}`)"
      >
        <DatePickerControl>
          <DatePickerTrigger class="rounded-md border border-h33 px-3 py-2 text-sm text-hff">
            <DatePickerValueText placeholder="选择日期" />
          </DatePickerTrigger>
        </DatePickerControl>

        <DatePickerContent>
          <DatePickerDayView />
        </DatePickerContent>
      </DatePicker>
    </div>

    <pre class="w-full max-w-[520px] whitespace-pre-wrap rounded-md bg-h0f p-3 text-xs text-hcc">{{
      joined
    }}</pre>
  </div>
</template>
