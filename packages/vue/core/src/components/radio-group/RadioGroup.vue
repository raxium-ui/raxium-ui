<script setup lang="ts">
import type { UseRadioGroupProps } from '@ark-ui/vue/radio-group'
import type { RadioGroupProps, RadioGroupRootEmits } from '.'
import { RadioGroup, useRadioGroup } from '@ark-ui/vue/radio-group'
import { useForwardExpose, useForwardProps } from '@ark-ui/vue/utils'
import { cxc } from '@raxium/themes/utils'
import { useCraft, useTheme } from '@raxium/vue/composables'
import { useProvideComponentTheme } from '@raxium/vue/composables/useProvideComponentTheme'

const { class: propsClass, theme: propsTheme, craft, ...props } = defineProps<RadioGroupProps>()
const emit = defineEmits<RadioGroupRootEmits>()
const radioGroup = useRadioGroup(useForwardProps(props) as unknown as UseRadioGroupProps, emit)

// theme
const theme = useTheme(() => propsTheme, undefined, () => craft)
useProvideComponentTheme(theme, () => propsTheme)
const crafts = useCraft(theme, 'tvRadioGroup')

// expose
defineExpose({ $api: radioGroup })
useForwardExpose()
</script>

<template>
  <RadioGroup.RootProvider
    :value="radioGroup"
    :class="crafts.root(cxc(propsClass))"
  >      <slot name="label" />
      <slot />  </RadioGroup.RootProvider>
</template>
