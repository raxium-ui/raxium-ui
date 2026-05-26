<script setup lang="ts">
import type { UseRadioGroupProps } from '@ark-ui/vue/radio-group'
import type { RadioGroupProps, RadioGroupRootEmits } from '.'
import { RadioGroup, useRadioGroup } from '@ark-ui/vue/radio-group'
import { useForwardExpose, useForwardProps } from '@ark-ui/vue/utils'
import { cxc } from '@raxium/themes/utils'
import { useCraft, useTheme } from '@raxium/vue/composables'
import { ThemeProvider } from '@raxium/vue/providers/theme'

const { class: propsClass, theme: propsTheme, craft, ...props } = defineProps<RadioGroupProps>()
const emit = defineEmits<RadioGroupRootEmits>()
const radioGroup = useRadioGroup(useForwardProps(props) as unknown as UseRadioGroupProps, emit)

// theme
const theme = useTheme(() => propsTheme, undefined, () => craft)
const crafts = useCraft(theme, 'tvRadioGroup')

// expose
defineExpose({ $api: radioGroup })
useForwardExpose()
</script>

<template>
  <RadioGroup.RootProvider
    :value="radioGroup"
    :class="crafts.root(cxc(propsClass))"
  >
    <ThemeProvider :value="theme">
      <slot name="label" />
      <slot />
    </ThemeProvider>
  </RadioGroup.RootProvider>
</template>
