<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { SliderMarkerProps } from '.'
import { useForwardProps } from '@ark-ui/vue'
import { Slider, useSliderContext } from '@ark-ui/vue/slider'
import { cxc } from '@raxium/themes/utils'
import { useCraft, useTheme } from '@raxium/vue/composables'
import { pick } from 'es-toolkit'

const { class: propsClass, theme: propsTheme, ui, ...props } = defineProps<SliderMarkerProps>()
const forwarded = useForwardProps(props)
const context = useSliderContext()

// theme
const theme = useTheme(() => propsTheme)
const crafts = useCraft(theme, 'tvSlider')
</script>

<template>
  <Slider.Marker
    v-bind="forwarded"
    :class="crafts.marker(cxc(ui?.root, propsClass))"
  >
    <slot
      name="default"
      :value="forwarded.value"
    >
      <div
        v-bind="pick(context.getMarkerProps(forwarded), ['data-state' as keyof HTMLAttributes])"
        :class="crafts.markerDot(cxc(ui?.dot))"
        data-scope="slider"
        data-part="marker-dot"
      />
      <slot
        name="value"
        :value="forwarded.value"
      >
        <span
          v-bind="pick(context.getMarkerProps(forwarded), ['data-state' as keyof HTMLAttributes])"
          :class="crafts.markerValue(cxc(ui?.value))"
        >
          {{ forwarded.value }}
        </span>
      </slot>
    </slot>
  </Slider.Marker>
</template>
