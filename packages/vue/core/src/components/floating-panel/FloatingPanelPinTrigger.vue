<script setup lang="ts">
import type { FloatingPanelPinTriggerProps } from '.'
import { useForwardProps } from '@ark-ui/vue'
import { ark } from '@ark-ui/vue/factory'
import { clsx } from '@raxium/themes/utils'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { Pin, PinOff } from 'lucide-vue-next'
import { computed } from 'vue'
import { injectFloatingPanelAppearanceContext } from './floating-panel-appearance-context'

const {
  class: propsClass,
  theme: propsTheme,
  ...props
} = defineProps<FloatingPanelPinTriggerProps>()
const emit = defineEmits<{ click: [event: MouseEvent] }>()

const forwarded = useForwardProps(props)
const { pinned, setPinned } = injectFloatingPanelAppearanceContext()

function handleClick(e: MouseEvent) {
  emit('click', e)
  if (e.defaultPrevented)
    return
  setPinned(!pinned.value)
}

// theme
const theme = useTheme(() => propsTheme)
const crafts = computed(() => theme.value.crafts.tvFloatingPanel())
</script>

<template>
  <ark.button
    v-bind="forwarded"
    :class="crafts.trigger({ class: clsx(propsClass), ...theme })"
    @click="handleClick"
  >
    <slot v-bind="{ pinned, setPinned }">
      <PinOff
        v-if="pinned"
        :style="{ width: '1lh', height: '1lh' }"
      />
      <Pin
        v-else
        :style="{ width: '1lh', height: '1lh' }"
      />
    </slot>
  </ark.button>
</template>
