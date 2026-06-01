<script setup lang="ts">
import type { DatePickerContentProvide, DatePickerDayViewProps } from '.'
import { DatePicker, useDatePickerContext } from '@ark-ui/vue'
import { cxc } from '@raxium/themes/utils'
import { useCraft } from '@raxium/vue/composables'
import { useInheritedTheme } from '@raxium/vue/composables/useInheritedTheme'
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
const theme = useInheritedTheme(() =>
  Object.assign({}, propsTheme, {
    view: 'day',
    weekDayType,
  }),
)
const crafts = useCraft(theme, 'tvDatePickerView', () => ({ view: 'day' as const }))
</script>

<template>
  <DatePicker.View
    view="day"
    :class="crafts.view(cxc(propsClass))"
  >
    <DatePicker.ViewControl :class="crafts.viewControl()">
      <DatePicker.PrevTrigger
        as-child
        :class="crafts.viewControlTrigger()"
      >
        <ChevronLeft />
      </DatePicker.PrevTrigger>
      <DatePicker.ViewTrigger
        v-if="viewsState.count > 1 && viewsState.hasMonthView"
        :class="crafts.viewTrigger()"
      >
        <DatePicker.RangeText />
      </DatePicker.ViewTrigger>
      <DatePicker.RangeText v-else />
      <DatePicker.NextTrigger
        as-child
        :class="crafts.viewControlTrigger()"
      >
        <ChevronRight />
      </DatePicker.NextTrigger>
    </DatePicker.ViewControl>
    <DatePicker.Table :class="crafts.table()">
      <div
        v-bind="context.getTableHeadProps()"
        :class="crafts.tableHead()"
      >
        <div
          v-for="(weekDay, id) in context.weekDays"
          v-bind="context.getTableHeaderProps()"
          :key="id"
          :class="crafts.tableHeader()"
        >
          {{ weekDay[weekDayType] }}
        </div>
      </div>
      <div
        v-bind="context.getTableBodyProps()"
        :class="crafts.tableBody()"
      >
        <DatePicker.TableCell
          v-for="(day, did) in flatten(context.weeks)"
          :key="did"
          :value="day"
          :class="crafts.tableCell()"
        >
          <DatePicker.TableCellTrigger
            :class="crafts.tableCellTrigger(context.getDayTableCellState({ value: day }))"
          >
            {{ day.day }}
          </DatePicker.TableCellTrigger>
        </DatePicker.TableCell>
      </div>
    </DatePicker.Table>
  </DatePicker.View>
</template>
