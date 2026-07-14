<script setup lang="ts">
import type { DatePickerContentProps, DatePickerContentProvide } from '.'
import { DatePicker } from '@ark-ui/vue'
import { ark } from '@ark-ui/vue/factory'
import { useForwardProps } from '@ark-ui/vue/utils'
import { cxc } from '@raxium/themes/utils'
import {
  useCraft,
  useProvideStructuralComponentTheme,
  useTeleportDetection,
  useTeleportedDepthOwner,
} from '@raxium/vue/composables'
import { useInheritedTheme } from '@raxium/vue/composables/useInheritedTheme'
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

// teleport detection
const { isTeleported, setElementRef: setPositionerRef } = useTeleportDetection()
const depth = useTeleportedDepthOwner({
  type: 'popover',
  active: isTeleported,
  fallbackZIndex: 'var(--z-popover, var(--z-index))',
})

// theme
const theme = useInheritedTheme(() => propsTheme)
useProvideStructuralComponentTheme(theme, () => propsTheme)
const crafts = useCraft(theme, 'tvDatePicker')
const positionerStyle = computed(() => ({
  zIndex: isTeleported.value ? depth.zIndex.value : 'auto',
}))

// provide
provide<DatePickerContentProvide>(DATE_PICKER_CONTENT_PROVIDE_KEY, { viewsState })
</script>

<template>
  <DatePicker.Positioner
    :ref="setPositionerRef"
    :style="positionerStyle"
  >
    <DatePicker.Content
      v-bind="forwarded"
      :class="crafts.content(cxc(propsClass))"
    >
      <slot name="prefix" />
      <ark.div
        :class="crafts.contentInner()"
        data-scope="date-picker"
        data-part="content-inner"
      >
        <slot />
      </ark.div>
      <slot name="suffix" />
    </DatePicker.Content>
  </DatePicker.Positioner>
</template>
