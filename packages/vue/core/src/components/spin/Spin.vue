<script setup lang="ts">
import type { VNode } from 'vue'
import type { SpinProps, SpinRenderProps } from '.'
import { ark } from '@ark-ui/vue/factory'
import { clsx } from '@raxium/themes/utils'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { computed, inject, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const {
  show,
  mode = 'inline',
  theme: propsTheme,
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
const theme = useTheme(() => propsTheme)
const crafts = computed(() => theme.value.crafts.tvSpin())
</script>

<template>
  <div
    v-show="isVisible"
    ref="spinPositionerRef"
    :class="crafts.positioner({ class: clsx(ui?.positioner, propsClass), mode, ...theme })"
  >
    <div :class="crafts.mask({ class: clsx(ui?.mask), ...theme })" />
    <div :class="crafts.indicator({ class: clsx(ui?.indicator), mode, ...theme })">
      <slot v-bind="{ mode, theme }">
        <component :is="renderIcon?.({ mode, theme })" />
      </slot>
      <ark.span
        :class="crafts.text({ class: clsx(ui?.text), ...theme })"
        as-child
      >
        <slot name="text" />
      </ark.span>
    </div>
  </div>
</template>
