<script setup lang="ts">
import { getLocalTimeZone } from '@internationalized/date'
import {
  DatePicker,
  DatePickerContent,
  DatePickerControl,
  DatePickerDayView,
  DatePickerMonthView,
  DatePickerTrigger,
  DatePickerValueText,
  DatePickerYearView,
} from '../index'
</script>

<template>
  <div class="w-full flex flex-col gap-2">
    <DatePicker :is-date-unavailable="(date) => date.toDate(getLocalTimeZone()) > new Date()">
      <DatePickerControl>
        <DatePickerTrigger class="rounded-md border border-h33 px-3 py-2 text-sm text-hff">
          <DatePickerValueText placeholder="选择日期" />
        </DatePickerTrigger>
      </DatePickerControl>

      <DatePickerContent>
        <DatePickerDayView />
        <DatePickerMonthView />
        <DatePickerYearView />
      </DatePickerContent>
    </DatePicker>
  </div>
</template>
