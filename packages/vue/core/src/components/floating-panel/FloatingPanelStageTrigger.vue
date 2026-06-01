<script setup lang="ts">
import type { FloatingPanelStageTriggerProps } from '.'
import { FloatingPanel, useForwardProps } from '@ark-ui/vue'
import { cxc } from '@raxium/themes/utils'
import { useCraft } from '@raxium/vue/composables'
import { useInheritedTheme } from '@raxium/vue/composables/useInheritedTheme'
import { Minus, Square, SquareArrowOutDownLeft } from 'lucide-vue-next'
import { computed, h } from 'vue'

const {
  class: propsClass,
  theme: propsTheme,
  stage,
  ...props
} = defineProps<FloatingPanelStageTriggerProps>()
const forwarded = useForwardProps(props)

const stageComponent = computed(() => {
  switch (stage) {
    case 'minimized':
      return h(Minus)
    case 'maximized':
      return h(Square)
    case 'default':
    default:
      return h(SquareArrowOutDownLeft)
  }
})

// theme
const theme = useInheritedTheme(() => propsTheme)
const crafts = useCraft(theme, 'tvFloatingPanel')
</script>

<template>
  <FloatingPanel.StageTrigger
    v-bind="forwarded"
    :stage="stage"
    :class="crafts.trigger(cxc(propsClass))"
  >
    <slot>
      <component :is="stageComponent" />
    </slot>
  </FloatingPanel.StageTrigger>
</template>
