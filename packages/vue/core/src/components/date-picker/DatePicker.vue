<script setup lang="ts">
import type { UseDatePickerProps } from '@ark-ui/vue'
import type { DatePickerProps, DatePickerRootEmits } from '.'
import { DatePicker, useDatePicker, useForwardExpose, useForwardProps } from '@ark-ui/vue'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { ThemeProvider } from '@raxium/vue/providers/theme'

const { theme: themeProps, ...props } = defineProps<DatePickerProps>()
const emit = defineEmits<DatePickerRootEmits>()
const datePicker = useDatePicker(useForwardProps<DatePickerProps, UseDatePickerProps>(props), emit)

// theme
const theme = useTheme(() => themeProps)

// expose
defineExpose({ $api: datePicker })
useForwardExpose()
</script>

<template>
  <DatePicker.RootProvider :value="datePicker">
    <ThemeProvider :value="theme">
      <slot />
    </ThemeProvider>
  </DatePicker.RootProvider>
</template>
