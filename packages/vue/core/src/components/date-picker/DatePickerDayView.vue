<script setup lang="ts">
import type { DatePickerContentProvide, DatePickerDayViewProps } from '.'
import { DatePicker, useDatePickerContext } from '@ark-ui/vue'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { flatten } from 'es-toolkit'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { computed, inject } from 'vue'
import { DATE_PICKER_CONTENT_PROVIDE_KEY } from '.'

const {
  class: propsClass,
  theme: propsTheme,
  weekDayType = 'short',
} = defineProps<DatePickerDayViewProps>()
const { viewsState } = inject<DatePickerContentProvide>(DATE_PICKER_CONTENT_PROVIDE_KEY, {
  viewsState: computed(() => ({
    count: 1,
    hasDayView: true,
    hasMonthView: false,
    hasYearView: false,
  })),
})

const context = useDatePickerContext()

// theme
const theme = useTheme(() =>
  Object.assign({}, propsTheme, {
    view: 'day',
    weekDayType,
  }),
)
const crafts = computed(() => theme.value.crafts.tvDatePickerView())
</script>

<template>
  <DatePicker.View
    view="day"
    :class="crafts.view({ class: propsClass, ...theme })"
  >
    <DatePicker.ViewControl :class="crafts.viewControl({ ...theme })">
      <DatePicker.PrevTrigger
        as-child
        :class="crafts.viewControlTrigger({ ...theme })"
      >
        <ChevronLeft :style="{ width: '1lh', height: '1lh' }" />
      </DatePicker.PrevTrigger>
      <DatePicker.ViewTrigger
        v-if="viewsState.count > 1 && viewsState.hasMonthView"
        :class="crafts.viewTrigger({ ...theme })"
      >
        <DatePicker.RangeText />
      </DatePicker.ViewTrigger>
      <DatePicker.RangeText v-else />
      <DatePicker.NextTrigger
        as-child
        :class="crafts.viewControlTrigger({ ...theme })"
      >
        <ChevronRight :style="{ width: '1lh', height: '1lh' }" />
      </DatePicker.NextTrigger>
    </DatePicker.ViewControl>
    <DatePicker.Table :class="crafts.table({ ...theme })">
      <div
        v-bind="context.getTableHeadProps()"
        :class="crafts.tableHead({ ...theme })"
      >
        <div
          v-for="(weekDay, id) in context.weekDays"
          v-bind="context.getTableHeaderProps()"
          :key="id"
          :class="crafts.tableHeader({ ...theme })"
        >
          {{ weekDay[weekDayType] }}
        </div>
      </div>
      <div
        v-bind="context.getTableBodyProps()"
        :class="crafts.tableBody({ ...theme })"
      >
        <DatePicker.TableCell
          v-for="(day, did) in flatten(context.weeks)"
          :key="did"
          :value="day"
          :class="crafts.tableCell({ ...theme })"
        >
          <DatePicker.TableCellTrigger
            :class="
              crafts.tableCellTrigger({ ...context.getDayTableCellState({ value: day }), ...theme })
            "
          >
            {{ day.day }}
          </DatePicker.TableCellTrigger>
        </DatePicker.TableCell>
      </div>
    </DatePicker.Table>
  </DatePicker.View>
</template>
