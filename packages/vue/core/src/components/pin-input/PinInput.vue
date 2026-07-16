<script setup lang="ts">
import type { PinInputRootEmits } from '@ark-ui/vue/pin-input'
import type { PinInputProps } from '.'

import { useForwardExpose, useForwardProps } from '@ark-ui/vue'
import { PinInput, usePinInput } from '@ark-ui/vue/pin-input'
import { cxc } from '@raxium/themes/utils'
import { useCraft, useTheme } from '@raxium/vue/composables'
import { computed } from 'vue'

const {
  class: propsClass,
  theme: propsTheme,
  craft,
  count = 4,
  separator,
  ui,
  ...props
} = defineProps<PinInputProps>()
const emits = defineEmits<PinInputRootEmits>()

const forwarded = useForwardProps(computed(() => ({ ...props, count })))
const pinInput = usePinInput(forwarded, emits)

// theme
const theme = useTheme(() => propsTheme)
const crafts = useCraft(theme, 'tvPinInput', undefined, () => craft)
// expose
defineExpose({ $api: pinInput })
useForwardExpose()
</script>

<template>
  <PinInput.RootProvider
    :value="pinInput"
    :class="crafts.root(cxc(ui?.root, propsClass))"
  >
    <PinInput.Label
      v-if="$slots.label"
      :class="crafts.label(cxc(ui?.label))"
    >
      <slot name="label" />
    </PinInput.Label>
    <PinInput.Control :class="crafts.control(cxc(ui?.control))">
      <slot name="prefix" />
      <slot
        name="default"
        :count="count"
      >
        <template
          v-for="(num, index) in count"
          :key="num"
        >
          <slot
            name="separator"
            :number="num"
            :index="index"
          >
            <span
              v-if="separator && index > 0"
              :class="crafts.separator(cxc(ui?.separator))"
              aria-hidden="true"
            >
              {{ separator }}
            </span>
          </slot>
          <PinInput.Input
            :class="crafts.input(cxc(ui?.input))"
            :index="index"
          />
        </template>
      </slot>
      <slot name="suffix" />
    </PinInput.Control>
    <PinInput.HiddenInput />
  </PinInput.RootProvider>
</template>
