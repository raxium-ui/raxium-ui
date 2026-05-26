<script setup lang="ts">
import type { FloatingPanelPinTriggerProps } from '.'
import { useForwardProps } from '@ark-ui/vue'
import { ark } from '@ark-ui/vue/factory'
import { cxc } from '@raxium/themes/utils'
import { useCraft } from '@raxium/vue/composables'
import { useInheritedTheme } from '@raxium/vue/composables/useInheritedTheme'
import { Pin, PinOff } from 'lucide-vue-next'
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
const theme = useInheritedTheme(() => propsTheme)
const crafts = useCraft(theme, 'tvFloatingPanel')
</script>

<template>
  <ark.button
    v-bind="forwarded"
    :class="crafts.trigger(cxc(propsClass))"
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
