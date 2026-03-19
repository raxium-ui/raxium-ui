<script setup lang="ts">
import type { FloatingPanelOpacityTriggerProps } from '.'
import { useForwardProps } from '@ark-ui/vue'
import { ark } from '@ark-ui/vue/factory'
import { clsx } from '@raxium/themes/utils'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { computed } from 'vue'
import { injectFloatingPanelAppearanceContext } from './floating-panel-appearance-context'

const {
  class: propsClass,
  theme: propsTheme,
  ...props
} = defineProps<FloatingPanelOpacityTriggerProps>()
const forwarded = useForwardProps(props)

const { opacity, setOpacity } = injectFloatingPanelAppearanceContext()
// theme
const theme = useTheme(() => propsTheme)
const crafts = computed(() => theme.value.crafts.tvFloatingPanel())
</script>

<template>
  <ark.button
    v-bind="forwarded"
    :class="crafts.trigger({ class: clsx(propsClass), ...theme })"
  >
    <slot v-bind="{ opacity, opacityGetter: () => opacity, setOpacity }" />
  </ark.button>
</template>
