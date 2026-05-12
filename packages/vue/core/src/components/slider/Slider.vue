<script setup lang="ts">
import type { SliderRootEmits } from '@ark-ui/vue/slider'
import type { SliderProps } from '.'
import { useForwardExpose, useForwardProps } from '@ark-ui/vue'
import { Slider, useSlider } from '@ark-ui/vue/slider'
import { cxc } from '@raxium/themes/utils'
import { useCraft, useTheme } from '@raxium/vue/composables'
import { ThemeProvider } from '@raxium/vue/providers/theme'
import { useTemplateRef } from 'vue'
import SliderBoundaryProvider from './SliderBoundaryProvider.vue'

const { class: propsClass, theme: propsTheme, craft, ui, ...props } = defineProps<SliderProps>()
const emit = defineEmits<SliderRootEmits>()
const forwarded = useForwardProps(props)

const slider = useSlider(forwarded, emit)
const controlRef = useTemplateRef('control')

const theme = useTheme(() => propsTheme, () => craft)
const crafts = useCraft(theme, 'tvSlider', () => ({
  orientation: forwarded.value.orientation ?? 'horizontal',
}))

// expose
defineExpose({ $api: slider })
useForwardExpose()
</script>

<template>
  <Slider.RootProvider
    :value="slider"
    :class="
      crafts.root(cxc(ui?.root, propsClass))
    "
  >
    <ThemeProvider :value="theme">
      <SliderBoundaryProvider :boundary="controlRef?.$el ?? 'clipping-ancestors'">
        <slot name="prefix" />
        <Slider.Control
          ref="control"
          :class="
            crafts.control(cxc(ui?.control))
          "
        >
          <Slider.Track
            :class="
              crafts.track(cxc(ui?.track))
            "
          >
            <Slider.Range
              :class="
                crafts.range(cxc(ui?.range))
              "
            />
          </Slider.Track>
          <slot />
        </Slider.Control>
        <slot name="suffix" />
      </SliderBoundaryProvider>
    </ThemeProvider>
  </Slider.RootProvider>
</template>
