<script setup lang="ts">
import type { FloatingPanelCloseTriggerProps } from '.'
import { FloatingPanel, useForwardProps } from '@ark-ui/vue'
import { clsx } from '@raxium/themes/utils'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { X } from 'lucide-vue-next'
import { computed } from 'vue'

const {
  class: propsClass,
  theme: propsTheme,
  ...props
} = defineProps<FloatingPanelCloseTriggerProps>()
const forwarded = useForwardProps(props)

// theme
const theme = useTheme(() => propsTheme)
const crafts = computed(() => theme.value.crafts.tvFloatingPanel())
</script>

<template>
  <FloatingPanel.CloseTrigger
    v-bind="forwarded"
    :class="crafts.trigger({ class: clsx(propsClass), ...theme })"
  >
    <slot>
      <X :style="{ width: '1lh', height: '1lh' }" />
    </slot>
  </FloatingPanel.CloseTrigger>
</template>
