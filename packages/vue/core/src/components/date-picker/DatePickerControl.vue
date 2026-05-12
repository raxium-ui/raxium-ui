<script setup lang="ts">
import type { DatePickerControlProps } from '.'
import { DatePicker } from '@ark-ui/vue'
import { useForwardProps } from '@ark-ui/vue/utils'
import { cxc } from '@raxium/themes/utils'
import { useCraft } from '@raxium/vue/composables'
import { useTheme } from '@raxium/vue/composables/useTheme'

const { class: propsClass, theme: propsTheme, ...props } = defineProps<DatePickerControlProps>()
const forwarded = useForwardProps(props)

// theme
const theme = useTheme(() => propsTheme)
const crafts = useCraft(theme, 'tvDatePicker')
</script>

<template>
  <DatePicker.Control
    v-bind="forwarded"
    :class="crafts.control(cxc(propsClass))"
  >
    <slot />
  </DatePicker.Control>
</template>
