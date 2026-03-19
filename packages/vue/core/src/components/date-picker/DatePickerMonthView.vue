<script setup lang="ts">
import type { DatePickerContentProvide, DatePickerMonthViewProps } from '.'
import { DatePicker, useDatePickerContext } from '@ark-ui/vue'
import { clsx } from '@raxium/themes/utils'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
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
const theme = useTheme(() =>
  Object.assign({}, propsTheme, {
    view: 'month',
    monthType,
  }),
)
const crafts = computed(() => theme.value.crafts.tvDatePickerView())
</script>

<template>
  <DatePicker.View
    view="month"
    :class="crafts.view({ class: clsx(propsClass), ...theme })"
  >
    <DatePicker.ViewControl :class="crafts.viewControl({ ...theme })">
      <DatePicker.PrevTrigger
        as-child
        :class="crafts.viewControlTrigger({ ...theme })"
      >
        <ChevronLeft :style="{ width: '1lh', height: '1lh' }" />
      </DatePicker.PrevTrigger>
      <DatePicker.ViewTrigger
        v-if="viewsState.count > 1 && viewsState.hasYearView"
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
        v-bind="context.getTableBodyProps()"
        :class="crafts.tableBody({ ...theme })"
      >
        <DatePicker.TableCell
          v-for="(month, mid) in context.getMonths({ format: monthType })"
          :key="mid"
          :value="month.value"
          :class="crafts.tableCell({ ...theme })"
        >
          <DatePicker.TableCellTrigger
            :class="
              crafts.tableCellTrigger({
                ...context.getMonthTableCellState({ value: month.value }),
                ...theme,
              })
            "
          >
            {{ month.label }}
          </DatePicker.TableCellTrigger>
        </DatePicker.TableCell>
      </div>
    </DatePicker.Table>
  </DatePicker.View>
</template>
