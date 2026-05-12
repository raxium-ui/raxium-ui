<script setup lang="ts">
import type { SelectTriggerProps } from '.'
import { Select } from '@ark-ui/vue/select'
import { useForwardProps } from '@ark-ui/vue/utils'
import { cxc } from '@raxium/themes/utils'
import { useCraft, useTheme } from '@raxium/vue/composables'
import { ChevronDown, CircleX } from 'lucide-vue-next'

const {
  class: propsClass,
  theme: propsTheme,
  clearable,
  ...props
} = defineProps<SelectTriggerProps>()
const forwarded = useForwardProps(props)

const theme = useTheme(() => propsTheme)
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
        <CircleX :style="{ width: '1lh', height: '1lh' }" />
      </Select.ClearTrigger>
      <Select.Indicator :class="crafts.indicator()">
        <slot name="indicator">
          <ChevronDown :style="{ width: '1lh', height: '1lh' }" />
        </slot>
      </Select.Indicator>
    </Select.Trigger>
  </Select.Control>
</template>
