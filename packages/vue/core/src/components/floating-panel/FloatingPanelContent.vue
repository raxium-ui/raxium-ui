<script setup lang="ts">
import type { ResizeTriggerAxis } from '@zag-js/floating-panel'
import type { VNode } from 'vue'
import type { FloatingPanelContentProps } from '.'
import { FloatingPanel } from '@ark-ui/vue'
import { cxc } from '@raxium/themes/utils'
import { useCraft } from '@raxium/vue/composables'
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
const crafts = useCraft(theme, 'tvFloatingPanel')

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
          class: crafts.value.resizeVertical(cxc(ui?.resizeVertical)),
        }),
      )
      break
    case 'y':
      nodes = ['n', 's'].map(ax =>
        h(FloatingPanel.ResizeTrigger, {
          axis: ax as ResizeTriggerAxis,
          class: crafts.value.resizeHorizontal(cxc(ui?.resizeHorizontal)),
        }),
      )
      break
    case 'xy':
      nodes = ['e', 'w', 'n', 's'].map(ax =>
        h(FloatingPanel.ResizeTrigger, {
          axis: ax as ResizeTriggerAxis,
          class:
            ax === 'e' || ax === 'w'
              ? crafts.value.resizeVertical(cxc(ui?.resizeVertical))
              : crafts.value.resizeHorizontal(cxc(ui?.resizeHorizontal)),
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
                ? crafts.value.resizeVertical(cxc(ui?.resizeVertical))
                : crafts.value.resizeHorizontal(cxc(ui?.resizeHorizontal)),
          })
        }
        // corner
        return h(FloatingPanel.ResizeTrigger, {
          axis: ax as ResizeTriggerAxis,
          class: crafts.value.resizeCorner(cxc(ui?.resizeCorner)),
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
      :class="crafts.positioner(cxc(ui?.positioner, propsClass))"
    >
      <FloatingPanel.Content
        v-bind="props"
        :class="crafts.content(cxc(ui?.content, propsClass))"
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
