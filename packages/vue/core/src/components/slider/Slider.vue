<script setup lang="ts">
import type { SliderRootEmits } from '@ark-ui/vue/slider'
import type { ComponentPublicInstance } from 'vue'
import type { SliderProps } from '.'
import { useForwardExpose, useForwardProps } from '@ark-ui/vue'
import { Slider, useSlider } from '@ark-ui/vue/slider'
import { cxc } from '@raxium/themes/utils'
import { useCraft, useTheme } from '@raxium/vue/composables'
import { ThemeProvider } from '@raxium/vue/providers/theme'
import { computed, useTemplateRef } from 'vue'
import SliderBoundaryProvider from './SliderBoundaryProvider.vue'

const { class: propsClass, theme: propsTheme, craft, ui, ...props } = defineProps<SliderProps>()
const emit = defineEmits<SliderRootEmits>()
const forwarded = useForwardProps(props)

const slider = useSlider(forwarded, emit)
const controlRef = useTemplateRef<ComponentPublicInstance | null>('control')
const controlEl = computed((): HTMLElement | undefined => {
  const root = controlRef.value?.$el
  return root instanceof HTMLElement ? root : undefined
})

const theme = useTheme(() => propsTheme, undefined, () => craft)
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
      <SliderBoundaryProvider :boundary="controlEl">
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
