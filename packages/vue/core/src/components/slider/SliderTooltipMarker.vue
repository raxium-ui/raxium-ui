<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { SliderTooltipMarkerProps } from '.'
import { useForwardProps } from '@ark-ui/vue'
import { Slider, useSliderContext } from '@ark-ui/vue/slider'
import { TooltipRootProvider, useTooltip } from '@ark-ui/vue/tooltip'
import { cxc } from '@raxium/themes/utils'
import { TooltipArrow, TooltipContent, TooltipTrigger } from '@raxium/vue/components/tooltip'
import { useCraft, useInheritedTheme, useTheme } from '@raxium/vue/composables'
import { useConfig } from '@raxium/vue/composables/useConfig'
import { useProvideStructuralComponentTheme } from '@raxium/vue/composables/useProvideComponentTheme'
import { pick } from 'es-toolkit'
import { merge } from 'es-toolkit/compat'
import { computed, watch } from 'vue'
import { injectSliderBoundaryContext } from './SliderBoundaryProvider.vue'

const {
  theme: propsTheme,
  value,
  index = 0,
  open, // tooltip prop
  class: propsClass,
  ui,
  widget,
  interactive,
  ...props
} = defineProps<SliderTooltipMarkerProps>()

const emit = defineEmits<{
  tooltipClick: [event: MouseEvent]
}>()

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
          boundary: () => boundary.value,
          overflowPadding: 0,
          placement: 'bottom',
          flip: false,
          shift: true,
          slide: true,
          overlap: false,
        },
      },
      configs.value,
      tooltipForwarded.value,
      { interactive },
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

// theme
const theme = useInheritedTheme(() => propsTheme)
useProvideStructuralComponentTheme(theme, () => propsTheme)
const tooltipTheme = useTheme(() => propsTheme, () => configs.value?.theme)
const crafts = useCraft(theme, 'tvSlider')

function handleTooltipContentClick(event: MouseEvent) {
  emit('tooltipClick', event)
  if (interactive)
    context.value.setThumbValue(index, value)
}
</script>

<template>
  <TooltipRootProvider :value="tooltip">
    <TooltipTrigger as-child>
      <Slider.Marker
        :value="value"
        :class="crafts.marker(cxc(ui?.root, propsClass))"
      >
        <slot>
          <div
            v-bind="pick(context.getMarkerProps({ value }), ['data-state' as keyof HTMLAttributes])"
            :class="crafts.markerDot(cxc(ui?.dot))"
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
        <TooltipContent
          v-bind="widget?.tooltipContent"
          @click="handleTooltipContentClick"
        >
          <slot name="arrow">
            <TooltipArrow v-bind="widget?.tooltipArrow" />
          </slot>
          <slot name="content">
            <span :class="crafts.markerValue(cxc(ui?.value))">
              {{ value }}
            </span>
          </slot>
        </TooltipContent>
      </Teleport>
      <TooltipContent
        v-else
        v-bind="widget?.tooltipContent"
        @click="handleTooltipContentClick"
      >
        <slot name="arrow">
          <TooltipArrow v-bind="widget?.tooltipArrow" />
        </slot>
        <slot name="content">
          <span
            v-bind="pick(context.getMarkerProps({ value }), ['data-state' as keyof HTMLAttributes])"
            :class="crafts.markerValue(cxc(ui?.value))"
          >
            {{ value }}
          </span>
        </slot>
      </TooltipContent>
    </ThemeProvider>
  </TooltipRootProvider>
</template>
