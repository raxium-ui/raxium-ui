<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { SliderMarkerProps } from '.'
import { useForwardProps } from '@ark-ui/vue'
import { Slider, useSliderContext } from '@ark-ui/vue/slider'
import { clsx } from '@raxium/themes/utils'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { pick } from 'es-toolkit'
import { computed } from 'vue'

const { class: propsClass, theme: propsTheme, ...props } = defineProps<SliderMarkerProps>()
const forwarded = useForwardProps(props)
const context = useSliderContext()

// theme
const theme = useTheme(() => propsTheme)
const crafts = computed(() => theme.value.crafts.tvSlider())
</script>

<template>
  <Slider.Marker v-bind="forwarded" :class="crafts.marker({ class: clsx(propsClass), ...theme })">
    <slot>
      <div
        :class="crafts.markerDot({ ...theme })"
        data-scope="slider"
        data-part="marker-dot"
        v-bind="pick(context.getMarkerProps(forwarded), ['data-state' as keyof HTMLAttributes])"
      />
      <span
        v-bind="pick(context.getMarkerProps(forwarded), ['data-state' as keyof HTMLAttributes])"
      >
        {{ forwarded.value }}
      </span>
    </slot>
  </Slider.Marker>
</template>
