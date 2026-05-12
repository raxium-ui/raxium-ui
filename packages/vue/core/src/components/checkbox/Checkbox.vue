<script setup lang="ts">
import type { CheckboxRootEmits, UseCheckboxProps, UseCheckboxReturn } from '@ark-ui/vue/checkbox'
import type { CheckboxProps, CheckedState } from './props'
import { Checkbox, useCheckbox } from '@ark-ui/vue/checkbox'
import { useForwardExpose, useForwardProps } from '@ark-ui/vue/utils'
import { cxc } from '@raxium/themes/utils'
import { useCraft } from '@raxium/vue/composables'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { Check, Minus } from 'lucide-vue-next'

const {
  class: propsClass,
  theme: propsTheme,
  label,
  ui,
  craft,
  ...props
} = defineProps<CheckboxProps>()
const emit = defineEmits<CheckboxRootEmits>()
const slots = defineSlots<{
  indicator: (props: { checkedState: CheckedState }) => any
  label: () => any
}>()

const forwarded = useForwardProps<CheckboxProps, UseCheckboxProps>(props)
const checkbox = useCheckbox(forwarded, emit)

// theme
const theme = useTheme(
  () => propsTheme,
  () => craft,
)
const crafts = useCraft(theme, 'tvCheckbox', () => ({
  disabled: forwarded.value.disabled,
}))

// expose
defineExpose({ $api: checkbox as UseCheckboxReturn })
useForwardExpose()
</script>

<template>
  <Checkbox.RootProvider
    :value="checkbox"
    :class="crafts.root(cxc(ui?.root, propsClass))"
  >
    <Checkbox.Control :class="crafts.control(cxc(ui?.control))">
      <Checkbox.Indicator :class="crafts.indicator(cxc(ui?.indicator))">
        <slot
          name="indicator"
          v-bind="{ checkedState: checkbox.checkedState }"
        >
          <Check :class="crafts.indicatorChecked()" />
        </slot>
      </Checkbox.Indicator>
      <Checkbox.Indicator
        :class="crafts.indicator(cxc(ui?.indicator))"
        indeterminate
      >
        <slot
          name="indicator"
          v-bind="{ checkedState: checkbox.checkedState }"
        >
          <Minus :class="crafts.indicatorMinus()" />
        </slot>
      </Checkbox.Indicator>
    </Checkbox.Control>
    <Checkbox.Label
      v-if="label || slots.label?.()"
      :class="crafts.label(cxc(ui?.label))"
      :as-child="!!label"
    >
      <slot name="label">
        <span>{{ label }}</span>
      </slot>
    </Checkbox.Label>
    <Checkbox.HiddenInput />
  </Checkbox.RootProvider>
</template>
