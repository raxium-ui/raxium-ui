<script setup lang="ts">
import type { TooltipRootEmits } from '@ark-ui/vue/tooltip'
import type { TooltipProps } from '.'
import { Tooltip, useTooltip } from '@ark-ui/vue/tooltip'
import { useForwardExpose, useForwardProps } from '@ark-ui/vue/utils'
import { useConfig } from '@raxium/vue/composables/useConfig'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { ThemeProvider } from '@raxium/vue/providers/theme'
import { defaults } from 'es-toolkit/compat'
import { computed, mergeProps } from 'vue'

const {
  theme: propsTheme,
  lazyMount = undefined,
  unmountOnExit = undefined,
  ...props
} = defineProps<TooltipProps>()
const emit = defineEmits<TooltipRootEmits>()
const tooltipConfig = useConfig('tooltip', () => ({ lazyMount, unmountOnExit }))
const forwarded = useForwardProps(props)
const tooltip = useTooltip(
  computed(() =>
    mergeProps(
      {
        openDelay: tooltipConfig.value?.openDelay,
        closeDelay: tooltipConfig.value?.closeDelay,
      },
      forwarded.value,
      {
        positioning: defaults(
          { ...(forwarded.value.positioning ?? {}) },
          { placement: tooltipConfig.value?.placement },
        ),
      },
    ),
  ),
  emit,
)

// theme
const theme = useTheme(() => ({ ...tooltipConfig.value?.theme, ...propsTheme }))

// expose
defineExpose({ $api: tooltip })
useForwardExpose()
</script>

<template>
  <Tooltip.RootProvider
    :value="tooltip"
    :lazy-mount="tooltipConfig?.lazyMount"
    :unmount-on-exit="tooltipConfig?.unmountOnExit"
  >
    <ThemeProvider :value="theme">
      <slot />
    </ThemeProvider>
  </Tooltip.RootProvider>
</template>
