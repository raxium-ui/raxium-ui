<script setup lang="ts">
import type { NumberInputRootEmits } from '@ark-ui/vue/number-input'
import type { NumberInputProps } from '.'
import { useForwardExpose, useForwardProps } from '@ark-ui/vue'
import { NumberInput, useNumberInput } from '@ark-ui/vue/number-input'
import { ChevronDown, ChevronUp } from '@lucide/vue'
import { cxc } from '@raxium/themes/utils'
import { useCraft, useTheme } from '@raxium/vue/composables'

const {
  class: propsClass,
  theme: propsTheme,
  craft,
  ui,
  showTrigger = false,
  ...props
} = defineProps<NumberInputProps>()
const emits = defineEmits<
  NumberInputRootEmits & {
    focus: [event: FocusEvent]
    blur: [event: FocusEvent]
    focusin: [event: FocusEvent]
    focusout: [event: FocusEvent]
  }
>()
const numberInput = useNumberInput(useForwardProps(props), emits)

function onFocusin(event: FocusEvent) {
  emits('focusin', event)
  emits('focus', event)
}
function onFocusout(event: FocusEvent) {
  emits('focusout', event)
  emits('blur', event)
}

// theme
const theme = useTheme(() => propsTheme, undefined, () => craft)
const inputCrafts = useCraft(theme, 'tvInput')
const crafts = useCraft(theme, 'tvNumberInput')

// expose
defineExpose({ $api: numberInput })
useForwardExpose()
</script>

<template>
  <NumberInput.RootProvider
    :value="numberInput"
    :class="crafts.root(cxc(ui?.root, propsClass))"
  >
    <slot name="prefix" />
    <NumberInput.Control :class="inputCrafts.root(cxc(crafts.control(), ui?.control))">
      <NumberInput.Input
        :class="inputCrafts.input(cxc(crafts.input(), ui?.input))"
        @focusin="onFocusin"
        @focusout="onFocusout"
      />
      <div
        v-if="showTrigger"
        :class="crafts.triggerGroup(cxc(ui?.triggerGroup))"
        data-scope="number-input"
        data-part="trigger-group"
      >
        <NumberInput.IncrementTrigger :class="crafts.trigger(cxc(ui?.trigger))">
          <ChevronUp />
        </NumberInput.IncrementTrigger>
        <NumberInput.DecrementTrigger :class="crafts.trigger(cxc(ui?.trigger))">
          <ChevronDown />
        </NumberInput.DecrementTrigger>
      </div>
    </NumberInput.Control>
    <slot name="suffix" />
  </NumberInput.RootProvider>
</template>
