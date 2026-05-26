<script setup lang="ts">
import type { DatePickerYearViewProps } from '.'
import { DatePicker, useDatePickerContext } from '@ark-ui/vue'
import { cxc } from '@raxium/themes/utils'
import { useCraft } from '@raxium/vue/composables'
import { useInheritedTheme } from '@raxium/vue/composables/useInheritedTheme'
import { flatten } from 'es-toolkit'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

const { class: propsClass, theme: propsTheme } = defineProps<DatePickerYearViewProps>()
const context = useDatePickerContext()

// theme
const theme = useInheritedTheme(() => Object.assign({}, propsTheme, { view: 'year' }))
const crafts = useCraft(theme, 'tvDatePickerView', () => ({ view: 'year' as const }))
</script>

<template>
  <DatePicker.View
    view="year"
    :class="crafts.view(cxc(propsClass))"
  >
    <DatePicker.ViewControl :class="crafts.viewControl()">
      <DatePicker.PrevTrigger
        as-child
        :class="crafts.viewControlTrigger()"
      >
        <ChevronLeft :style="{ width: '1lh', height: '1lh' }" />
      </DatePicker.PrevTrigger>
      <DatePicker.RangeText />
      <DatePicker.NextTrigger
        as-child
        :class="crafts.viewControlTrigger()"
      >
        <ChevronRight :style="{ width: '1lh', height: '1lh' }" />
      </DatePicker.NextTrigger>
    </DatePicker.ViewControl>

    <DatePicker.Table :class="crafts.table()">
      <div
        v-bind="context.getTableBodyProps()"
        :class="crafts.tableBody()"
      >
        <DatePicker.TableCell
          v-for="(year, yid) in flatten(context.getYearsGrid({ columns: 4 }))"
          :key="`year-${yid}`"
          :value="year.value"
          :class="crafts.tableCell()"
        >
          <DatePicker.TableCellTrigger
            :class="crafts.tableCellTrigger(context.getYearTableCellState({ value: year.value }))"
          >
            {{ year.label }}
          </DatePicker.TableCellTrigger>
        </DatePicker.TableCell>
      </div>
    </DatePicker.Table>
  </DatePicker.View>
</template>
