<script setup lang="ts">
import type { UseDatePickerProps } from '@ark-ui/vue'
import type { DatePickerProps, DatePickerRootEmits } from '.'
import { DatePicker, useDatePicker, useForwardExpose, useForwardProps } from '@ark-ui/vue'
import { useConfig } from '@raxium/vue/composables/useConfig'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { ThemeProvider } from '@raxium/vue/providers/theme'
import { defaults } from 'es-toolkit/compat'
import { computed, mergeProps } from 'vue'

const { theme: themeProps, lazyMount, unmountOnExit, ...props } = defineProps<DatePickerProps>()
const emit = defineEmits<DatePickerRootEmits>()

const datePickerOptions = useConfig('date-picker', () => ({ unmountOnExit, lazyMount }))
const forwarded = useForwardProps<DatePickerProps, UseDatePickerProps>(props)
const datePicker = useDatePicker(
  computed(
    () =>
      mergeProps(forwarded.value as Record<string, unknown>, {
        positioning: defaults(
          { ...(forwarded.value.positioning ?? {}) },
          { placement: datePickerOptions.value?.placement },
        ),
      }) as UseDatePickerProps,
  ),
  emit,
)

// theme
const theme = useTheme(() => ({ ...datePickerOptions.value?.theme, ...themeProps }))

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
