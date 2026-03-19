<script setup lang="ts">
import type { SelectTriggerProps } from '.'
import { Select } from '@ark-ui/vue/select'
import { useForwardProps } from '@ark-ui/vue/utils'
import { clsx } from '@raxium/themes/utils'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { ChevronDown, CircleX } from 'lucide-vue-next'
import { computed } from 'vue'

const {
  class: propsClass,
  theme: propsTheme,
  clearable,
  ...props
} = defineProps<SelectTriggerProps>()
const forwarded = useForwardProps(props)

const theme = useTheme(() => propsTheme)
const crafts = computed(() => theme.value.crafts.tvSelect())
</script>

<template>
  <Select.Control>
    <Select.Trigger
      v-bind="forwarded"
      :class="crafts.trigger({ class: clsx(propsClass), ...theme })"
    >
      <slot />
      <Select.ClearTrigger
        v-if="clearable"
        :class="crafts.clearTrigger({ ...theme })"
      >
        <CircleX :style="{ width: '1lh', height: '1lh' }" />
      </Select.ClearTrigger>
      <Select.Indicator :class="crafts.indicator({ ...theme })">
        <slot name="indicator">
          <ChevronDown :style="{ width: '1lh', height: '1lh' }" />
        </slot>
      </Select.Indicator>
    </Select.Trigger>
  </Select.Control>
</template>
