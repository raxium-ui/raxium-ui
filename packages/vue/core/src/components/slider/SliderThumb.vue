<script setup lang="ts">
import type { SliderThumbProps } from '.'
import { useForwardProps } from '@ark-ui/vue'
import { Slider } from '@ark-ui/vue/slider'
import { cxc } from '@raxium/themes/utils'
import { useCraft, useInheritedTheme } from '@raxium/vue/composables'

const {
  class: propsClass,
  theme: propsTheme,
  ...props
} = defineProps<SliderThumbProps>()
const forwarded = useForwardProps(props)

const theme = useInheritedTheme(() => propsTheme)
const crafts = useCraft(theme, 'tvSlider')
</script>

<template>
  <Slider.Thumb
    v-bind="forwarded"
    :class="crafts.thumb(cxc(propsClass))"
    :data-theme-size="theme.size"
  >
    <Slider.HiddenInput />
  </Slider.Thumb>
</template>
