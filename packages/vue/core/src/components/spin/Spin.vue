<script setup lang="ts">
import type { VNode } from 'vue'
import type { SpinProps, SpinRenderProps } from '.'
import { ark } from '@ark-ui/vue/factory'
import { cxc } from '@raxium/themes/utils'
import { useCraft, useTheme } from '@raxium/vue/composables'
import { computed, inject, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const {
  show,
  mode = 'inline',
  theme: propsTheme,
  craft,
  delay,
  ui,
  class: propsClass,
} = defineProps<SpinProps>()

const { renderIcon }
  = inject<{ renderIcon: (props: SpinRenderProps) => VNode | null }>('SpinProvider') ?? {}

const isFullscreen = computed(() => mode === 'fullscreen')
const isVisible = ref(show)
let timeoutId: number | null = null
watch(
  () => show,
  (newVal) => {
    if (!newVal && delay) {
      timeoutId = window.setTimeout(() => {
        isVisible.value = false
        timeoutId = null
      }, delay)
    }
    else {
      if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = null
      }
      isVisible.value = newVal
    }
  },
  { immediate: true },
)

/** Positioner element — used to resolve the parent for inline `position:relative`. */
const spinPositionerRef = ref<HTMLElement | null>(null)

let parentPosition = document?.body?.style?.position ?? ''
function updateParentStyle() {
  if (isFullscreen.value) {
    document.body.style.position = isVisible.value ? 'relative' : parentPosition
  }
  else {
    const parent = spinPositionerRef.value?.parentElement
    if (parent) {
      parent.style.position = isVisible.value ? 'relative' : parentPosition
    }
  }
}
watch(isVisible, () => updateParentStyle())

onMounted(() => {
  if (isFullscreen.value) {
    parentPosition = document.body.style.position
  }
  else {
    const parent = spinPositionerRef.value?.parentElement
    if (parent) {
      parentPosition = parent.style.position
    }
  }
  updateParentStyle()
})

onBeforeUnmount(() => {
  if (timeoutId) {
    clearTimeout(timeoutId)
  }
  if (isFullscreen.value) {
    document.body.style.position = ''
  }
})

// theme
const theme = useTheme(() => propsTheme, () => craft)
const crafts = useCraft(theme, 'tvSpin', () => ({ mode }))
</script>

<template>
  <div
    v-show="isVisible"
    ref="spinPositionerRef"
    :class="crafts.positioner(cxc(ui?.positioner, propsClass))"
  >
    <div :class="crafts.mask(cxc(ui?.mask))" />
    <div :class="crafts.indicator(cxc(ui?.indicator))">
      <slot v-bind="{ mode, theme }">
        <component :is="renderIcon?.({ mode, theme })" />
      </slot>
      <ark.span
        :class="crafts.text(cxc(ui?.text))"
        as-child
      >
        <slot name="text" />
      </ark.span>
    </div>
  </div>
</template>
