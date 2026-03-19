<script setup lang="ts">
import type { DatePickerYearViewProps } from '.'
import { DatePicker, useDatePickerContext } from '@ark-ui/vue'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { flatten } from 'es-toolkit'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { computed } from 'vue'

const { class: propsClass, theme: propsTheme } = defineProps<DatePickerYearViewProps>()
const context = useDatePickerContext()

// theme
const theme = useTheme(() => Object.assign({}, propsTheme, { view: 'year' }))
const crafts = computed(() => theme.value.crafts.tvDatePickerView())
</script>

<template>
  <DatePicker.View
    view="year"
    :class="crafts.view({ class: propsClass, ...theme })"
  >
    <DatePicker.ViewControl :class="crafts.viewControl({ ...theme })">
      <DatePicker.PrevTrigger
        as-child
        :class="crafts.viewControlTrigger({ ...theme })"
      >
        <ChevronLeft :style="{ width: '1lh', height: '1lh' }" />
      </DatePicker.PrevTrigger>
      <DatePicker.RangeText />
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
          v-for="(year, yid) in flatten(context.getYearsGrid({ columns: 4 }))"
          :key="`year-${yid}`"
          :value="year.value"
          :class="crafts.tableCell({ ...theme })"
        >
          <DatePicker.TableCellTrigger
            :class="
              crafts.tableCellTrigger({
                ...context.getYearTableCellState({ value: year.value }),
                ...theme,
              })
            "
          >
            {{ year.label }}
          </DatePicker.TableCellTrigger>
        </DatePicker.TableCell>
      </div>
    </DatePicker.Table>
  </DatePicker.View>
</template>
