<script setup lang="ts">
import type { FloatingPanelCloseTriggerProps } from '.'
import { FloatingPanel, useForwardProps } from '@ark-ui/vue'
import { cxc } from '@raxium/themes/utils'
import { useCraft } from '@raxium/vue/composables'
import { useInheritedTheme } from '@raxium/vue/composables/useInheritedTheme'
import { X } from 'lucide-vue-next'

const {
  class: propsClass,
  theme: propsTheme,
  ...props
} = defineProps<FloatingPanelCloseTriggerProps>()
const forwarded = useForwardProps(props)

// theme
const theme = useInheritedTheme(() => propsTheme)
const crafts = useCraft(theme, 'tvFloatingPanel')
</script>

<template>
  <FloatingPanel.CloseTrigger
    v-bind="forwarded"
    :class="crafts.trigger(cxc(propsClass))"
  >
    <slot>
      <X />
    </slot>
  </FloatingPanel.CloseTrigger>
</template>
