<script setup lang="ts">
import type { ResizeTriggerAxis } from '@zag-js/floating-panel'
import type { VNode } from 'vue'
import type { FloatingPanelContentProps } from '.'
import { FloatingPanel } from '@ark-ui/vue'
import { clsx } from '@raxium/themes/utils'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { computed, h, toValue } from 'vue'
import { injectFloatingPanelAppearanceContext } from './floating-panel-appearance-context'

const {
  class: propsClass,
  theme: propsTheme,
  ui,
  ...props
} = defineProps<FloatingPanelContentProps>()

const { opacity, resizeAxis } = injectFloatingPanelAppearanceContext()

// theme
const theme = useTheme(() => propsTheme)
const crafts = computed(() => theme.value.crafts.tvFloatingPanel())
const style = computed(() => ({
  opacity: opacity.value / 100,
}))

const resizeNodes = computed(() => {
  const axis = toValue(resizeAxis)
  let nodes: VNode[] = []
  switch (axis) {
    case 'x':
      nodes = ['e', 'w'].map(ax =>
        h(FloatingPanel.ResizeTrigger, {
          axis: ax as ResizeTriggerAxis,
          class: crafts.value.resizeVertical({ class: clsx(ui?.resizeVertical), ...theme }),
        }),
      )
      break
    case 'y':
      nodes = ['n', 's'].map(ax =>
        h(FloatingPanel.ResizeTrigger, {
          axis: ax as ResizeTriggerAxis,
          class: crafts.value.resizeHorizontal({ class: clsx(ui?.resizeHorizontal), ...theme }),
        }),
      )
      break
    case 'xy':
      nodes = ['e', 'w', 'n', 's'].map(ax =>
        h(FloatingPanel.ResizeTrigger, {
          axis: ax as ResizeTriggerAxis,
          class:
            ax === 'e' || ax === 'w'
              ? crafts.value.resizeVertical({ class: clsx(ui?.resizeVertical), ...theme })
              : crafts.value.resizeHorizontal({ class: clsx(ui?.resizeHorizontal), ...theme }),
        }),
      )
      break
    case 'xyc':
      nodes = ['e', 'w', 'n', 's', 'ne', 'nw', 'se', 'sw'].map((ax) => {
        if (ax.length === 1) {
          // line
          return h(FloatingPanel.ResizeTrigger, {
            axis: ax as ResizeTriggerAxis,
            class:
              ax === 'e' || ax === 'w'
                ? crafts.value.resizeVertical({ class: clsx(ui?.resizeVertical), ...theme })
                : crafts.value.resizeHorizontal({ class: clsx(ui?.resizeHorizontal), ...theme }),
          })
        }
        // corner
        return h(FloatingPanel.ResizeTrigger, {
          axis: ax as ResizeTriggerAxis,
          class: crafts.value.resizeCorner({ class: clsx(ui?.resizeCorner), ...theme }),
        })
      })
      break
    case 'custom':
    default:
      break
  }
  return nodes
})
</script>

<template>
  <Teleport to="body">
    <FloatingPanel.Positioner
      :class="crafts.positioner({ class: clsx(ui?.positioner, propsClass), ...theme })"
    >
      <FloatingPanel.Content
        v-bind="props"
        :class="crafts.content({ class: clsx(ui?.content, propsClass), ...theme })"
        :style="style"
      >
        <slot />
        <template
          v-for="node in resizeNodes"
          :key="node.key"
        >
          <component :is="node" />
        </template>
      </FloatingPanel.Content>
    </FloatingPanel.Positioner>
  </Teleport>
</template>
