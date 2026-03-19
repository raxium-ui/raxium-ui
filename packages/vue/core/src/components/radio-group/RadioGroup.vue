<script setup lang="ts">
import type { UseRadioGroupProps } from '@ark-ui/vue/radio-group'
import type { RadioGroupProps, RadioGroupRootEmits } from '.'
import { RadioGroup, useRadioGroup } from '@ark-ui/vue/radio-group'
import { useForwardExpose, useForwardProps } from '@ark-ui/vue/utils'
import { clsx } from '@raxium/themes/utils'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { ThemeProvider } from '@raxium/vue/providers/theme'
import { computed } from 'vue'

const { class: propsClass, theme: propsTheme, ...props } = defineProps<RadioGroupProps>()
const emit = defineEmits<RadioGroupRootEmits>()
const radioGroup = useRadioGroup(useForwardProps(props) as unknown as UseRadioGroupProps, emit)

// theme
const theme = useTheme(() => propsTheme)
const crafts = computed(() => theme.value.crafts.tvRadioGroup())

// expose
defineExpose({ $api: radioGroup })
useForwardExpose()
</script>

<template>
  <RadioGroup.RootProvider
    :value="radioGroup"
    :class="crafts.root({ class: clsx(propsClass), ...theme })"
  >
    <ThemeProvider :value="theme">
      <slot name="label" />
      <slot />
    </ThemeProvider>
  </RadioGroup.RootProvider>
</template>
