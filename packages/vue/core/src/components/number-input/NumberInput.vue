<script setup lang="ts">
import type { NumberInputRootEmits } from '@ark-ui/vue/number-input'
import type { NumberInputProps } from '.'
import { useForwardExpose, useForwardProps } from '@ark-ui/vue'
import { NumberInput, useNumberInput } from '@ark-ui/vue/number-input'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { ChevronDown, ChevronUp } from 'lucide-vue-next'
import { computed } from 'vue'

const {
  class: propsClass,
  theme: propsTheme,
  ui,
  showTrigger = false,
  ...props
} = defineProps<NumberInputProps>()
const emits = defineEmits<
  NumberInputRootEmits & {
    focus: [event: FocusEvent]
    blur: [event: FocusEvent]
  }
>()
const numberInput = useNumberInput(useForwardProps(props), emits)

// theme
const theme = useTheme(() => propsTheme)
const inputCrafts = computed(() => theme.value.crafts.tvInput())
const crafts = computed(() => theme.value.crafts.tvNumberInput())

// expose
defineExpose({ $api: numberInput })
useForwardExpose()
</script>

<template>
  <NumberInput.RootProvider
    :value="numberInput"
    :class="crafts.root({ class: [ui?.root, propsClass], ...theme })"
  >
    <slot name="prefix" />
    <NumberInput.Control :class="inputCrafts.root({ class: ui?.control, ...theme })">
      <NumberInput.Input
        :class="
          inputCrafts.input({ class: crafts.input({ class: ui?.input, ...theme }), ...theme })
        "
        @focus="emits('focus', $event)"
        @blur="emits('blur', $event)"
      />
      <div
        v-if="showTrigger"
        :class="crafts.triggerGroup({ class: ui?.triggerGroup, ...theme })"
        data-scope="number-input"
        data-part="trigger-group"
      >
        <NumberInput.IncrementTrigger :class="crafts.trigger({ class: ui?.trigger, ...theme })">
          <ChevronUp />
        </NumberInput.IncrementTrigger>
        <NumberInput.DecrementTrigger :class="crafts.trigger({ class: ui?.trigger, ...theme })">
          <ChevronDown />
        </NumberInput.DecrementTrigger>
      </div>
    </NumberInput.Control>
    <slot name="suffix" />
  </NumberInput.RootProvider>
</template>
