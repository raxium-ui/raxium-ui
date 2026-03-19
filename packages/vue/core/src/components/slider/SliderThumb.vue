<script setup lang="ts">
import type { SliderThumbProps } from '.'
import { useForwardProps } from '@ark-ui/vue'
import { Slider } from '@ark-ui/vue/slider'
import { clsx } from '@raxium/themes/utils'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { computed } from 'vue'

const {
  class: propsClass,
  theme: propsTheme,
  ...props
} = defineProps<SliderThumbProps>()
const forwarded = useForwardProps(props)

const theme = useTheme(() => propsTheme)
const crafts = computed(() => theme.value.crafts.tvSlider())
</script>

<template>
  <Slider.Thumb
    v-bind="forwarded"
    :class="crafts.thumb({ class: clsx(propsClass), ...theme })"
    :data-theme-size="theme.size"
  >
    <Slider.HiddenInput class="hidden" />
  </Slider.Thumb>
</template>
