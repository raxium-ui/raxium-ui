<script setup lang="ts">
import type { SliderTooltipThumbProps } from '.'
import { useForwardExpose, useForwardProps } from '@ark-ui/vue'
import { Slider, useSliderContext } from '@ark-ui/vue/slider'
import { TooltipRootProvider, useTooltip } from '@ark-ui/vue/tooltip'
import { cxc } from '@raxium/themes/utils'
import { TooltipArrow, TooltipContent, TooltipTrigger } from '@raxium/vue/components/tooltip'
import { useCraft, useInheritedTheme, useTheme } from '@raxium/vue/composables'
import { useConfig } from '@raxium/vue/composables/useConfig'
import { useProvideStructuralComponentTheme } from '@raxium/vue/composables/useProvideComponentTheme'
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
          boundary: () => boundary.value,
          overflowPadding: 0,
          placement: 'top',
          flip: false,
          shift: true,
          slide: true,
          overlap: false,
        },
      },
      configs.value,
      tooltipForwarded.value,
    ),
  ),
)

watch(
  () => boundary.value,
  (val) => {
    if (val instanceof Element || Array.isArray(val)) {
      // trackPositioning uses raf (defer: true) to snapshot options on first placement.
      // setTimeout ensures reposition runs after that raf completes with the correct boundary.
      setTimeout(() => tooltip.value.reposition())
    }
  },
  { once: true },
)
watch(
  () => context.value.value,
  () => {
    // we reposition when the value changes, it will be smoother when thumb fast dragging
    tooltip.value.reposition()
  },
)

// theme
const theme = useInheritedTheme(() => propsTheme)
useProvideStructuralComponentTheme(theme, () => propsTheme)
const tooltipTheme = useTheme(() => propsTheme, () => configs.value?.theme)
const crafts = useCraft(theme, 'tvSlider')

// expose
const { forwardRef } = useForwardExpose()
</script>

<template>
  <TooltipRootProvider :value="tooltip">
    <TooltipTrigger as-child>
      <Slider.Thumb
        :ref="(el) => el && forwardRef(el)"
        :class="crafts.thumb(cxc(propsClass))"
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
</template>
