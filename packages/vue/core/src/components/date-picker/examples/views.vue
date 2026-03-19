<script setup lang="ts">
import { ref } from 'vue'
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

const value = ref([])
</script>

<template>
  <div class="w-full flex flex-col gap-2">
    <div class="text-sm text-hcc">
      views: day / month / year（通过点击 RangeText 切换）
    </div>

    <div class="w-full max-w-[520px] rounded-md border border-h33 p-3">
      <DatePicker
        v-model="value"
        :num-of-months="1"
      >
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
  </div>
</template>
