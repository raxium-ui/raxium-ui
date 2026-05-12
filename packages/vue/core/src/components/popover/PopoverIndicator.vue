<script setup lang="ts">
import type { PopoverIndicatorProps } from '.'
import { PopoverIndicator } from '@ark-ui/vue'
import { cxc } from '@raxium/themes/utils'
import { useCraft, useTheme } from '@raxium/vue/composables'
import { ChevronDown } from 'lucide-vue-next'

const {
  class: propsClass,
  theme: propsTheme,
  asChild = true,
} = defineProps<PopoverIndicatorProps>()
const theme = useTheme(() => propsTheme)

const crafts = useCraft(theme, 'tvPopover')
</script>

<template>
  <PopoverIndicator
    :as-child="asChild"
    :class="crafts.indicator(cxc(propsClass))"
  >
    <slot>
      <ChevronDown :style="{ width: '1lh', height: '1lh' }" />
    </slot>
  </PopoverIndicator>
</template>
