<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { SliderTooltipMarkerProps } from '.'
import { useForwardProps } from '@ark-ui/vue'
import { Slider, useSliderContext } from '@ark-ui/vue/slider'
import { TooltipRootProvider, useTooltip } from '@ark-ui/vue/tooltip'
import { clsx } from '@raxium/themes/utils'
import { TooltipArrow, TooltipContent, TooltipTrigger } from '@raxium/vue/components/tooltip'
import { useConfig } from '@raxium/vue/composables/useConfig'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { ThemeProvider } from '@raxium/vue/providers/theme'
import { pick } from 'es-toolkit'
import { merge } from 'es-toolkit/compat'
import { computed } from 'vue'
import { createBoundaryClamp } from './boundary-clamp'
import { injectSliderBoundaryContext } from './SliderBoundaryProvider.vue'

const {
  theme: propsTheme,
  value,
  open, // tooltip prop
  class: propsClass,
  ui,
  widget,
  ...props
} = defineProps<SliderTooltipMarkerProps>()
const context = useSliderContext()

const boundary = injectSliderBoundaryContext()
const tooltipForwarded = useForwardProps(props)
const configs = useConfig('tooltip')
const boundaryClamp = createBoundaryClamp(boundary)
const tooltip = useTooltip(
  computed(() =>
    merge(
      {
        open: true,
        positioning: {
          boundary: boundary.value,
          overflowPadding: 0,
          placement: 'bottom',
          shift: 0,
          flip: false,
          updatePosition: boundaryClamp,
        },
      },
      configs.value,
      tooltipForwarded.value,
    ),
  ),
)

// theme
const theme = useTheme(() => propsTheme)
const tooltipTheme = useTheme(() => ({ ...configs.value?.theme, ...propsTheme }))
const crafts = computed(() => theme.value.crafts.tvSlider())
</script>

<template>
  <ThemeProvider :value="theme">
    <TooltipRootProvider :value="tooltip">
      <TooltipTrigger as-child>
        <Slider.Marker
          :value="value"
          :class="crafts.marker({ class: clsx(ui?.root, propsClass), ...theme })"
        >
          <slot>
            <div
              v-bind="pick(context.getMarkerProps({ value }), ['data-state' as keyof HTMLAttributes])"
              :class="crafts.markerDot({ class: clsx(ui?.dot), ...theme })"
              data-scope="slider"
              data-part="marker-dot"
            />
          </slot>
        </Slider.Marker>
      </TooltipTrigger>
      <ThemeProvider :value="tooltipTheme">
        <Teleport
          v-if="tooltipForwarded.positioning?.strategy === 'fixed'"
          to="body"
        >
          <TooltipContent v-bind="widget?.tooltipContent">
            <slot name="arrow">
              <TooltipArrow v-bind="widget?.tooltipArrow" />
            </slot>
            <slot name="content">
              <span :class="crafts.markerValue({ class: clsx(ui?.value), ...theme })">
                {{ value }}
              </span>
            </slot>
          </TooltipContent>
        </Teleport>
        <TooltipContent v-else v-bind="widget?.tooltipContent">
          <slot name="arrow">
            <TooltipArrow v-bind="widget?.tooltipArrow" />
          </slot>
          <slot name="content">
            <span :class="crafts.markerValue({ class: clsx(ui?.value), ...theme })">
              {{ value }}
            </span>
          </slot>
        </TooltipContent>
      </ThemeProvider>
    </TooltipRootProvider>
  </ThemeProvider>
</template>
