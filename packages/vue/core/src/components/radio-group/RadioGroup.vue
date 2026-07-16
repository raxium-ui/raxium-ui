<script setup lang="ts">
import type { UseRadioGroupProps } from '@ark-ui/vue/radio-group'
import type { RadioGroupProps, RadioGroupRootEmits } from '.'
import { RadioGroup, useRadioGroup } from '@ark-ui/vue/radio-group'
import { useForwardExpose, useForwardProps } from '@ark-ui/vue/utils'
import { cxc } from '@raxium/themes/utils'
import { useCraft, useTheme, useThemeCraft } from '@raxium/vue/composables'
import { useProvideComponentTheme } from '@raxium/vue/composables/useProvideComponentTheme'

const {
  class: propsClass,
  theme: propsTheme,
  craft,
  ui,
  label,
  ...props
} = defineProps<RadioGroupProps>()
const emit = defineEmits<RadioGroupRootEmits>()
const radioGroup = useRadioGroup(useForwardProps(props) as unknown as UseRadioGroupProps, emit)

// theme
const theme = useTheme(() => propsTheme)
const themed = useThemeCraft(theme, 'tvRadioGroup', () => craft)
useProvideComponentTheme(themed, () => propsTheme)
const crafts = useCraft(themed, 'tvRadioGroup')

// expose
defineExpose({ $api: radioGroup })
useForwardExpose()
</script>

<template>
  <RadioGroup.RootProvider
    :value="radioGroup"
    :class="crafts.root(cxc(ui?.root, propsClass))"
  >
    <RadioGroup.Label
      v-if="label || $slots.label"
      :class="crafts.label(cxc(ui?.label))"
    >
      <slot name="label">
        {{ label }}
      </slot>
    </RadioGroup.Label>
    <slot />
  </RadioGroup.RootProvider>
</template>
