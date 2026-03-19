<script setup lang="ts">
import type { FloatingPanelStageTriggerProps } from '.'
import { FloatingPanel, useForwardProps } from '@ark-ui/vue'
import { clsx } from '@raxium/themes/utils'
import { useTheme } from '@raxium/vue/composables/useTheme'
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
const theme = useTheme(() => propsTheme)
const crafts = computed(() => theme.value.crafts.tvFloatingPanel())
</script>

<template>
  <FloatingPanel.StageTrigger
    v-bind="forwarded"
    :stage="stage"
    :class="crafts.trigger({ class: clsx(propsClass), ...theme })"
  >
    <slot>
      <component :is="stageComponent" :style="{ width: '1lh', height: '1lh' }" />
    </slot>
  </FloatingPanel.StageTrigger>
</template>
