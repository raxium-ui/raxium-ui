<script setup lang="ts">
import type { UseDatePickerProps } from '@ark-ui/vue'
import type { DatePickerProps, DatePickerRootEmits } from '.'
import { DatePicker, useDatePicker, useForwardExpose, useForwardProps } from '@ark-ui/vue'
import { useConfig } from '@raxium/vue/composables/useConfig'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { ThemeProvider } from '@raxium/vue/providers/theme'

const { theme: themeProps, lazyMount, unmountOnExit, ...props } = defineProps<DatePickerProps>()
const emit = defineEmits<DatePickerRootEmits>()

const forwarded = useForwardProps<DatePickerProps, UseDatePickerProps>(props)
const datePicker = useDatePicker(forwarded, emit)
const datePickerOptions = useConfig('date-picker', () => ({ unmountOnExit, lazyMount }))

// theme
const theme = useTheme(() => themeProps)

// expose
defineExpose({ $api: datePicker })
useForwardExpose()
</script>

<template>
  <DatePicker.RootProvider
    :value="datePicker"
    :lazy-mount="datePickerOptions?.lazyMount"
    :unmount-on-exit="datePickerOptions?.unmountOnExit"
  >
    <ThemeProvider :value="theme">
      <slot />
    </ThemeProvider>
  </DatePicker.RootProvider>
</template>
