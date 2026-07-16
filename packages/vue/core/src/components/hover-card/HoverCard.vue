<script setup lang="ts">
import type { HoverCardRootEmits } from '@ark-ui/vue/hover-card'
import type { HoverCardProps } from '.'
import { HoverCard, useHoverCard } from '@ark-ui/vue/hover-card'
import { useForwardExpose, useForwardProps } from '@ark-ui/vue/utils'
import { useConfig } from '@raxium/vue/composables/useConfig'
import { useProvideComponentTheme } from '@raxium/vue/composables/useProvideComponentTheme'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { useThemeCraft } from '@raxium/vue/composables/useThemeCraft'
import { defaults } from 'es-toolkit/compat'
import { computed, mergeProps } from 'vue'

const {
  theme: propsTheme,
  craft,
  lazyMount = undefined,
  unmountOnExit = undefined,
  ...props
} = defineProps<HoverCardProps>()
const emit = defineEmits<HoverCardRootEmits>()
const hoverCardConfig = useConfig('hover-card', () => ({
  lazyMount,
  unmountOnExit,
}))
const forwarded = useForwardProps(props)
const hoverCard = useHoverCard(
  computed(() =>
    mergeProps(
      {
        openDelay: hoverCardConfig.value?.openDelay,
        closeDelay: hoverCardConfig.value?.closeDelay,
      },
      forwarded.value,
      {
        positioning: defaults(
          { ...(forwarded.value.positioning ?? {}) },
          { placement: hoverCardConfig.value?.placement },
        ),
      },
    ),
  ),
  emit,
)

// theme
const theme = useTheme(
  () => propsTheme,
  () => hoverCardConfig.value?.theme,
)
const themed = useThemeCraft(theme, 'tvHoverCard', () => craft)
useProvideComponentTheme(themed, () => propsTheme)

// expose
defineExpose({ $api: hoverCard })
useForwardExpose()
</script>

<template>
  <HoverCard.RootProvider
    :value="hoverCard"
    :lazy-mount="hoverCardConfig?.lazyMount"
    :unmount-on-exit="hoverCardConfig?.unmountOnExit"
  >
    <slot />
  </HoverCard.RootProvider>
</template>
