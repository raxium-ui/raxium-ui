<script setup lang="ts">
import type { CheckboxRootEmits, UseCheckboxProps, UseCheckboxReturn } from '@ark-ui/vue/checkbox'
import type { CheckboxProps, CheckedState } from './props'
import { Checkbox, useCheckbox } from '@ark-ui/vue/checkbox'
import { useForwardExpose, useForwardProps } from '@ark-ui/vue/utils'
import { clsx } from '@raxium/themes/utils'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { Check, Minus } from 'lucide-vue-next'
import { computed } from 'vue'

const { class: propsClass, theme: propsTheme, label, ui, ...props } = defineProps<CheckboxProps>()
const emit = defineEmits<CheckboxRootEmits>()
const slots = defineSlots<{
  indicator: (props: { checkedState: CheckedState }) => any
  label: () => any
}>()

const forwarded = useForwardProps<CheckboxProps, UseCheckboxProps>(props)
const checkbox = useCheckbox(forwarded, emit)

// theme
const theme = useTheme(() => propsTheme)
const crafts = computed(() => theme.value.crafts.tvCheckbox())

// expose
defineExpose({ $api: checkbox as UseCheckboxReturn })
useForwardExpose()
</script>

<template>
  <Checkbox.RootProvider
    :value="checkbox"
    :class="crafts.root({ class: clsx(ui?.root, propsClass), ...theme })"
  >
    <Checkbox.Control :class="crafts.control({ class: clsx(ui?.control), ...theme })">
      <Checkbox.Indicator :class="crafts.indicator({ class: clsx(ui?.indicator), ...theme })">
        <slot name="indicator" v-bind="{ checkedState: checkbox.checkedState }">
          <Check :class="crafts.indicatorChecked({ ...theme })" />
        </slot>
      </Checkbox.Indicator>
      <Checkbox.Indicator
        :class="crafts.indicator({ class: clsx(ui?.indicator), ...theme })"
        indeterminate
      >
        <slot name="indicator" v-bind="{ checkedState: checkbox.checkedState }">
          <Minus :class="crafts.indicatorMinus({ ...theme })" />
        </slot>
      </Checkbox.Indicator>
    </Checkbox.Control>
    <Checkbox.Label
      v-if="label || slots.label?.()"
      :class="crafts.label({ class: clsx(ui?.label), ...theme })"
      :as-child="!!label"
    >
      <slot name="label">
        <span>{{ label }}</span>
      </slot>
    </Checkbox.Label>
    <Checkbox.HiddenInput />
  </Checkbox.RootProvider>
</template>
