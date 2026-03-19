<script setup lang="ts">
import type { PopoverIndicatorProps } from '.'
import { PopoverIndicator } from '@ark-ui/vue'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { ChevronDown } from 'lucide-vue-next'
import { computed } from 'vue'

const {
  class: propsClass,
  theme: propsTheme,
  asChild = true,
} = defineProps<PopoverIndicatorProps>()
const theme = useTheme(() => propsTheme)

const crafts = computed(() => theme.value.crafts.tvPopover())
</script>

<template>
  <PopoverIndicator
    :as-child="asChild"
    :class="crafts.indicator({ class: propsClass, ...theme })"
  >
    <slot>
      <ChevronDown :style="{ width: '1lh', height: '1lh' }" />
    </slot>
  </PopoverIndicator>
</template>
