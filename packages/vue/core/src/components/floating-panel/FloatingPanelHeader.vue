<script setup lang="ts">
import type { FloatingPanelHeaderProps } from '.'
import { FloatingPanel, useForwardProps } from '@ark-ui/vue'
import { cxc } from '@raxium/themes/utils'
import { useCraft } from '@raxium/vue/composables'
import { useInheritedTheme } from '@raxium/vue/composables/useInheritedTheme'

const {
  class: propsClass,
  theme: propsTheme,
  ui,
  ...props
} = defineProps<FloatingPanelHeaderProps>()
const forwarded = useForwardProps(props)

// theme
const theme = useInheritedTheme(() => propsTheme)
const crafts = useCraft(theme, 'tvFloatingPanel')
</script>

<template>
  <FloatingPanel.DragTrigger>
    <FloatingPanel.Header
      v-bind="forwarded"
      :class="crafts.header(cxc(ui?.root, propsClass))"
    >
      <FloatingPanel.Title :class="crafts.title(cxc(ui?.title))">
        <slot />
      </FloatingPanel.Title>
      <FloatingPanel.Control :class="crafts.control(cxc(ui?.control))">
        <slot name="control" />
      </FloatingPanel.Control>
    </FloatingPanel.Header>
  </FloatingPanel.DragTrigger>
</template>
