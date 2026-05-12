<script setup lang="ts">
import type { FloatingPanelOpacityTriggerProps } from '.'
import { useForwardProps } from '@ark-ui/vue'
import { ark } from '@ark-ui/vue/factory'
import { cxc } from '@raxium/themes/utils'
import { useCraft } from '@raxium/vue/composables'
import { useTheme } from '@raxium/vue/composables/useTheme'
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
const crafts = useCraft(theme, 'tvFloatingPanel')
</script>

<template>
  <ark.button
    v-bind="forwarded"
    :class="crafts.trigger(cxc(propsClass))"
  >
    <slot v-bind="{ opacity, opacityGetter: () => opacity, setOpacity }" />
  </ark.button>
</template>
