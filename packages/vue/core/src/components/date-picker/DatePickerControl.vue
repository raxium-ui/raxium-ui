<script setup lang="ts">
import type { DatePickerControlProps } from '.'
import { DatePicker } from '@ark-ui/vue'
import { useForwardProps } from '@ark-ui/vue/utils'
import { clsx } from '@raxium/themes/utils'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { computed } from 'vue'

const { class: propsClass, theme: propsTheme, ...props } = defineProps<DatePickerControlProps>()
const forwarded = useForwardProps(props)

// theme
const theme = useTheme(() => propsTheme)
const crafts = computed(() => theme.value.crafts.tvDatePicker())
</script>

<template>
  <DatePicker.Control
    v-bind="forwarded"
    :class="crafts.control({ class: clsx(propsClass), ...theme })"
  >
    <slot />
  </DatePicker.Control>
</template>
