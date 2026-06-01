<script setup lang="ts">
import type { PopoverIndicatorProps } from '.'
import { PopoverIndicator } from '@ark-ui/vue'
import { ChevronDown } from '@lucide/vue'
import { cxc } from '@raxium/themes/utils'
import { useCraft, useInheritedTheme } from '@raxium/vue/composables'

const {
  class: propsClass,
  theme: propsTheme,
  asChild = true,
} = defineProps<PopoverIndicatorProps>()
const theme = useInheritedTheme(() => propsTheme)

const crafts = useCraft(theme, 'tvPopover')
</script>

<template>
  <PopoverIndicator
    :as-child="asChild"
    :class="crafts.indicator(cxc(propsClass))"
  >
    <slot>
      <ChevronDown />
    </slot>
  </PopoverIndicator>
</template>
