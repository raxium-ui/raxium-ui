<script setup lang="ts">
import type { DatePickerContentProps, DatePickerContentProvide } from '.'
import { DatePicker } from '@ark-ui/vue'
import { ark } from '@ark-ui/vue/factory'
import { useForwardProps } from '@ark-ui/vue/utils'
import { clsx } from '@raxium/themes/utils'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { findVNodeByName, findVNodesByName } from '@raxium/vue/utils/vnode'
import { compact, isNil } from 'es-toolkit'
import { computed, provide, useSlots } from 'vue'
import { DATE_PICKER_CONTENT_PROVIDE_KEY } from '.'

const { class: propsClass, theme: propsTheme, ...props } = defineProps<DatePickerContentProps>()
const forwarded = useForwardProps(props)

const slots = useSlots()
const defaultSlots = computed(() => slots.default?.())
const viewsState = computed(() => {
  const state = {
    count: 0,
    hasDayView: false,
    hasMonthView: false,
    hasYearView: false,
  }
  state.count = compact(
    ['DatePickerDayView', 'DatePickerMonthView', 'DatePickerYearView'].map((name) => {
      return findVNodesByName(defaultSlots.value, name).length > 0
    }),
  ).length
  state.hasDayView = !isNil(findVNodeByName(defaultSlots.value, 'DatePickerDayView'))
  state.hasMonthView = !isNil(findVNodeByName(defaultSlots.value, 'DatePickerMonthView'))
  state.hasYearView = !isNil(findVNodeByName(defaultSlots.value, 'DatePickerYearView'))
  return state
})

// theme
const theme = useTheme(() => propsTheme)
const crafts = computed(() => theme.value.crafts.tvDatePicker())

// provide
provide<DatePickerContentProvide>(DATE_PICKER_CONTENT_PROVIDE_KEY, { viewsState })
</script>

<template>
  <DatePicker.Positioner>
    <DatePicker.Content
      v-bind="forwarded"
      :class="crafts.content({ class: clsx(propsClass), ...theme })"
    >
      <slot name="prefix" />
      <ark.div
        :class="crafts.contentInner({ ...theme })"
        data-scope="date-picker"
        data-part="content-inner"
      >
        <slot />
      </ark.div>
      <slot name="suffix" />
    </DatePicker.Content>
  </DatePicker.Positioner>
</template>
