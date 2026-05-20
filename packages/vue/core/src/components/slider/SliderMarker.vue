<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { SliderMarkerProps } from '.'
import { useForwardProps } from '@ark-ui/vue'
import { Slider, useSliderContext } from '@ark-ui/vue/slider'
import { cxc } from '@raxium/themes/utils'
import { useCraft, useTheme } from '@raxium/vue/composables'
import { pick } from 'es-toolkit'
import { computed } from 'vue'

const {
  class: propsClass,
  theme: propsTheme,
  ui,
  value,
  index = 0,
  interactive = false,
  ...props
} = defineProps<SliderMarkerProps>()
const forwarded = useForwardProps(props)
const context = useSliderContext()

const theme = useTheme(() => propsTheme)
const crafts = useCraft(theme, 'tvSlider')

/**
 * Zag sets marker root to pointer-events: none so clicks reach the track.
 * When interactive, we must lift stacking and re-enable hits on this subtree,
 * otherwise Slider.Control (paint order / hit-test) steals the pointer.
 */
const markerValueStyle = computed(() =>
  interactive ? { pointerEvents: 'auto' as const } : undefined,
)

function handleMarkerPointerDown(event: PointerEvent) {
  if (!interactive)
    return
  if (event.button !== 0)
    return
  event.stopPropagation()
  context.value.setThumbValue(index, value)
}
</script>

<template>
  <Slider.Marker
    :value="value"
    v-bind="forwarded"
    :class="crafts.marker(cxc(ui?.root, propsClass))"
  >
    <slot
      name="default"
      :value="value"
    >
      <div
        v-bind="pick(context.getMarkerProps({ value }), ['data-state' as keyof HTMLAttributes])"
        :class="crafts.markerDot(cxc(ui?.dot))"
        data-scope="slider"
        data-part="marker-dot"
        @pointerdown.stop="handleMarkerPointerDown"
      />
      <slot
        name="value"
        :value="value"
      >
        <span
          v-bind="pick(context.getMarkerProps({ value }), ['data-state' as keyof HTMLAttributes])"
          :class="crafts.markerValue(cxc(ui?.value))"
          :style="markerValueStyle"
          @pointerdown.stop="handleMarkerPointerDown"
        >
          {{ value }}
        </span>
      </slot>
    </slot>
  </Slider.Marker>
</template>
