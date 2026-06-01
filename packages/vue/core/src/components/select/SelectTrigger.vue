<script setup lang="ts">
import type { SelectTriggerProps } from '.'
import { Select } from '@ark-ui/vue/select'
import { useForwardProps } from '@ark-ui/vue/utils'
import { ChevronDown, CircleX } from '@lucide/vue'
import { cxc } from '@raxium/themes/utils'
import { useCraft, useInheritedTheme } from '@raxium/vue/composables'

const {
  class: propsClass,
  theme: propsTheme,
  clearable,
  ...props
} = defineProps<SelectTriggerProps>()
const forwarded = useForwardProps(props)

const theme = useInheritedTheme(() => propsTheme)
const crafts = useCraft(theme, 'tvSelect')
</script>

<template>
  <Select.Control>
    <Select.Trigger
      v-bind="forwarded"
      :class="crafts.trigger(cxc(propsClass))"
    >
      <slot />
      <Select.ClearTrigger
        v-if="clearable"
        :class="crafts.clearTrigger()"
      >
        <slot name="clearIcon">
          <CircleX />
        </slot>
      </Select.ClearTrigger>
      <Select.Indicator :class="crafts.indicator()">
        <slot name="indicator">
          <ChevronDown />
        </slot>
      </Select.Indicator>
    </Select.Trigger>
  </Select.Control>
</template>
