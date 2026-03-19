<script setup lang="ts">
import type { FloatingPanelProps, FloatingPanelRootEmits } from '.'
import { FloatingPanel, useFloatingPanel, useForwardExpose, useForwardProps } from '@ark-ui/vue'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { ThemeProvider } from '@raxium/vue/providers/theme'
import { clamp } from 'es-toolkit'
import { computed, ref } from 'vue'
import { provideFloatingPanelAppearanceContext } from './floating-panel-appearance-context'

const {
  class: propsClass,
  theme: propsTheme,
  opacity: propsOpacity = 100,
  pinned: propsPinned = false,
  resizeAxis = 'xyc',
  lazyMount = undefined,
  unmountOnExit = undefined,
  draggable = true,
  ...props
} = defineProps<FloatingPanelProps>()
const emit = defineEmits<FloatingPanelRootEmits>()
const forwarded = useForwardProps(props)

const pinned = ref(propsPinned)
function setPinned(_pinned: boolean) {
  pinned.value = _pinned
}
const opacity = ref(propsOpacity)
function setOpacity(_opacity: number) {
  opacity.value = clamp(_opacity, 0, 100)
}
const mergedProps = computed(() => {
  return {
    ...forwarded.value,
    draggable: !pinned.value && draggable,
  }
})
const floatingPanel = useFloatingPanel(mergedProps, emit)

// appearance context
provideFloatingPanelAppearanceContext({
  opacity,
  pinned,
  setOpacity,
  setPinned,
  resizeAxis: () => resizeAxis,
})

// theme
const theme = useTheme(() => propsTheme)

// expose
defineExpose({
  $api: Object.assign({}, floatingPanel, {
    pinned,
    setPinned: (p: boolean) => {
      pinned.value = p
    },
    opacity,
    setOpacity: (o: number) => {
      opacity.value = clamp(o, 0, 100)
    },
  }),
})
useForwardExpose()
</script>

<template>
  <FloatingPanel.RootProvider :value="floatingPanel">
    <ThemeProvider :value="theme">
      <slot />
    </ThemeProvider>
  </FloatingPanel.RootProvider>
</template>
