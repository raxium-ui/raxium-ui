<script setup lang="ts">
import type { SliderTooltipThumbProps } from '.'
import { useForwardExpose, useForwardProps } from '@ark-ui/vue'
import { Slider, useSliderContext } from '@ark-ui/vue/slider'
import { TooltipRootProvider, useTooltip } from '@ark-ui/vue/tooltip'
import { clsx } from '@raxium/themes/utils'
import { TooltipArrow, TooltipContent, TooltipTrigger } from '@raxium/vue/components/tooltip'
import { useConfig } from '@raxium/vue/composables/useConfig'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { ThemeProvider } from '@raxium/vue/providers/theme'
import { merge } from 'es-toolkit/compat'
import { computed, watch } from 'vue'
import { injectSliderBoundaryContext } from './SliderBoundaryProvider.vue'

const {
  class: propsClass,
  theme: propsTheme,
  index, // thumb prop
  name, // thumb prop
  open, // tooltip prop
  widget,
  ...props
} = defineProps<SliderTooltipThumbProps>()
const context = useSliderContext()

const boundary = injectSliderBoundaryContext()
const tooltipForwarded = useForwardProps(props)
const configs = useConfig('tooltip')
const tooltip = useTooltip(
  computed(() =>
    merge(
      {
        open: open?.(context.value) ?? context.value.dragging,
        positioning: {
          boundary: boundary.value,
          overflowPadding: 0,
          placement: 'top',
          shift: 0,
          flip: false,
        },
      },
      configs.value,
      tooltipForwarded.value,
    ),
  ),
)

watch(
  () => context.value.value,
  () => {
    // we reposition when the value changes, it will be smoother when thumb fast dragging
    tooltip.value.reposition()
  },
)

// theme
const theme = useTheme(() => propsTheme)
const tooltipTheme = useTheme(() => ({ ...configs.value?.theme, ...propsTheme }))
const crafts = computed(() => theme.value.crafts.tvSlider())

// expose
const { forwardRef } = useForwardExpose()
</script>

<template>
  <ThemeProvider :value="theme">
    <TooltipRootProvider :value="tooltip">
      <TooltipTrigger as-child>
        <Slider.Thumb
          :ref="(el) => el && forwardRef(el)"
          :class="crafts.thumb({ class: clsx(propsClass), ...theme })"
          :data-theme-size="theme.size"
          :index="index"
          :name="name"
        >
          <Slider.HiddenInput />
        </Slider.Thumb>
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
            <slot name="default">
              <Slider.ValueText />
            </slot>
          </TooltipContent>
        </Teleport>
        <TooltipContent
          v-else
          v-bind="widget?.tooltipContent"
        >
          <slot name="arrow">
            <TooltipArrow v-bind="widget?.tooltipArrow" />
          </slot>
          <slot name="default">
            <Slider.ValueText />
          </slot>
        </TooltipContent>
      </ThemeProvider>
    </TooltipRootProvider>
  </ThemeProvider>
</template>
