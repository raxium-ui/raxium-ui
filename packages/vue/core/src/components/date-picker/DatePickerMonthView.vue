<script setup lang="ts">
import type { DatePickerContentProvide, DatePickerMonthViewProps } from '.'
import { DatePicker, useDatePickerContext } from '@ark-ui/vue'
import { ChevronLeft, ChevronRight } from '@lucide/vue'
import { cxc } from '@raxium/themes/utils'
import { useCraft } from '@raxium/vue/composables'
import { useInheritedTheme } from '@raxium/vue/composables/useInheritedTheme'
import { computed, inject } from 'vue'
import { DATE_PICKER_CONTENT_PROVIDE_KEY } from '.'

const {
  class: propsClass,
  theme: propsTheme,
  monthType = 'short',
} = defineProps<DatePickerMonthViewProps>()
const { viewsState } = inject<DatePickerContentProvide>(DATE_PICKER_CONTENT_PROVIDE_KEY, {
  viewsState: computed(() => ({
    count: 1,
    hasDayView: false,
    hasMonthView: true,
    hasYearView: false,
  })),
})
const context = useDatePickerContext()

// theme
const theme = useInheritedTheme(() =>
  Object.assign({}, propsTheme, {
    view: 'month',
    monthType,
  }),
)
const crafts = useCraft(theme, 'tvDatePickerView', () => ({ view: 'month' as const }))
</script>

<template>
  <DatePicker.View
    view="month"
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
        v-if="viewsState.count > 1 && viewsState.hasYearView"
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
        v-bind="context.getTableBodyProps()"
        :class="crafts.tableBody()"
      >
        <DatePicker.TableCell
          v-for="(month, mid) in context.getMonths({ format: monthType })"
          :key="mid"
          :value="month.value"
          :class="crafts.tableCell()"
        >
          <DatePicker.TableCellTrigger
            :class="crafts.tableCellTrigger(context.getMonthTableCellState({ value: month.value }))"
          >
            {{ month.label }}
          </DatePicker.TableCellTrigger>
        </DatePicker.TableCell>
      </div>
    </DatePicker.Table>
  </DatePicker.View>
</template>
