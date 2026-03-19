<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { SliderTooltipMarkerProps } from '.'
import { useForwardProps } from '@ark-ui/vue'
import { Slider, useSliderContext } from '@ark-ui/vue/slider'
import { TooltipRootProvider, useTooltip } from '@ark-ui/vue/tooltip'
import { TooltipArrow, TooltipContent, TooltipTrigger } from '@raxium/vue/components/tooltip'
import { useConfig } from '@raxium/vue/composables/useConfig'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { ThemeProvider } from '@raxium/vue/providers/theme'
import { pick } from 'es-toolkit'
import { merge } from 'es-toolkit/compat'
import { computed } from 'vue'
import { injectSliderBoundaryContext } from './SliderBoundaryProvider.vue'

const {
  theme: propsTheme,
  value,
  open, // tooltip prop
  ...props
} = defineProps<SliderTooltipMarkerProps>()
const context = useSliderContext()

const boundary = injectSliderBoundaryContext()
const tooltipForwarded = useForwardProps(props)
const configs = useConfig('tooltip')
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
        },
      },
      configs.value,
      tooltipForwarded.value,
    ),
  ),
)

const theme = useTheme(() => propsTheme)
const crafts = computed(() => theme.value.crafts.tvSlider())
</script>

<template>
  <ThemeProvider :value="theme">
    <TooltipRootProvider :value="tooltip">
      <TooltipTrigger as-child>
        <Slider.Marker :value="value">
          <slot>
            <div
              :class="crafts.markerDot({ ...theme })"
              data-scope="slider"
              data-part="marker-dot"
              v-bind="pick(context.getMarkerProps({ value }), ['data-state' as keyof HTMLAttributes])"
            />
          </slot>
        </Slider.Marker>
      </TooltipTrigger>
      <TooltipContent>
        <slot name="arrow">
          <TooltipArrow />
        </slot>
        <slot name="content">
          {{ value }}
        </slot>
      </TooltipContent>
    </TooltipRootProvider>
  </ThemeProvider>
</template>
