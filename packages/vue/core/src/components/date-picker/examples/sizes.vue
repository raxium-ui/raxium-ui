<script setup lang="ts">
import type { ViewChangeDetails } from '@zag-js/date-picker'
import { ref } from 'vue'
import { Button } from '../../button'
import {
  DatePicker,
  DatePickerContent,
  DatePickerControl,
  DatePickerDayView,
  DatePickerMonthView,
  DatePickerTrigger,
  DatePickerYearView,
} from '../index'

const value = ref([])
const sizes = ['xs', 'sm', 'base', 'lg'] as const

function handleViewChange(details: ViewChangeDetails) {
  console.log('view change', details)
}
</script>

<template>
  <div class="w-full flex flex-col gap-2">
    <div class="text-sm text-hcc">
      value: <span class="text-hff">{{ value.length ? String(value[0]) : '(empty)' }}</span>
    </div>
    <div class="w-full flex items-center gap-4 max-w-[520px] rounded-md border border-h33 p-3">
      <DatePicker
        v-for="size in sizes"
        :key="size"
        v-model="value"
        :theme="{ size }"
        @view-change="handleViewChange"
      >
        <DatePickerControl class="w-fit">
          <DatePickerTrigger>
            <Button :theme="{ size }">
              {{ size }}
            </Button>
          </DatePickerTrigger>
        </DatePickerControl>
        <DatePickerContent>
          <DatePickerDayView week-day-type="short" />
          <DatePickerMonthView />
          <DatePickerYearView />
        </DatePickerContent>
      </DatePicker>
    </div>
  </div>
</template>
