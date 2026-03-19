<script setup lang="ts">
import type { FloatingPanelHeaderProps } from '.'
import { FloatingPanel, useForwardProps } from '@ark-ui/vue'
import { clsx } from '@raxium/themes/utils'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { computed } from 'vue'

const {
  class: propsClass,
  theme: propsTheme,
  ui,
  ...props
} = defineProps<FloatingPanelHeaderProps>()
const forwarded = useForwardProps(props)

// theme
const theme = useTheme(() => propsTheme)
const crafts = computed(() => theme.value.crafts.tvFloatingPanel())
</script>

<template>
  <FloatingPanel.DragTrigger>
    <FloatingPanel.Header
      v-bind="forwarded"
      :class="crafts.header({ class: clsx(ui?.root, propsClass), ...theme })"
    >
      <FloatingPanel.Title :class="crafts.title({ class: clsx(ui?.title), ...theme })">
        <slot />
      </FloatingPanel.Title>
      <FloatingPanel.Control :class="crafts.control({ class: clsx(ui?.control), ...theme })">
        <slot name="control" />
      </FloatingPanel.Control>
    </FloatingPanel.Header>
  </FloatingPanel.DragTrigger>
</template>
