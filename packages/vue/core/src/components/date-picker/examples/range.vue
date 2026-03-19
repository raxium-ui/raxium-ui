<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  DatePicker,
  DatePickerContent,
  DatePickerControl,
  DatePickerDayView,
  DatePickerMonthView,
  DatePickerTrigger,
  DatePickerValueText,
} from '../index'

const value = ref([])
const text = computed(() =>
  value.value.length ? value.value.map(v => String(v)).join(' ~ ') : '(empty)',
)
</script>

<template>
  <div class="w-full flex flex-col gap-2">
    <div class="text-sm text-hcc">
      range: <span class="text-hff">{{ text }}</span>
    </div>

    <div class="w-full max-w-[520px] rounded-md border border-h33 p-3">
      <DatePicker
        v-model="value"
        selection-mode="range"
      >
        <DatePickerControl>
          <DatePickerTrigger class="rounded-md border border-h33 px-3 py-2 text-sm text-hff">
            <DatePickerValueText placeholder="选择日期范围" />
          </DatePickerTrigger>
        </DatePickerControl>

        <DatePickerContent>
          <DatePickerDayView />
          <DatePickerMonthView />
        </DatePickerContent>
      </DatePicker>
    </div>
  </div>
</template>
