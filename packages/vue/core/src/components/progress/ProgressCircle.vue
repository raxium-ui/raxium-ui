<script setup lang="ts">
import type { ProgressCircleProps, ProgressCircleTheme } from '.'
import { useForwardProps } from '@ark-ui/vue'
import { Progress } from '@ark-ui/vue/progress'
import { clsx } from '@raxium/themes/utils'
import { useCustomTheme } from '@raxium/vue/composables/useTheme'
import { omit } from 'es-toolkit'
import { computed, useTemplateRef } from 'vue'
import { useRangeTransfer } from './useRangeTransfer'

const {
  class: propsClass,
  theme: propsTheme,
  variant = 'default',
  ui,
  ...props
} = defineProps<ProgressCircleProps>()
const forwarded = useForwardProps(props)

const rangeRef = useTemplateRef<{ $el: HTMLDivElement }>('range')
const { styles: transferStyles } = useRangeTransfer(
  rangeRef,
  computed(() => variant),
  'stroke',
)

// theme
const theme = useCustomTheme<ProgressCircleTheme>(() => propsTheme)
const themeRest = computed(() => omit(theme.value, ['size']))
const crafts = computed(() => theme.value.crafts.tvProgress())
</script>

<template>
  <Progress.Circle
    v-bind="forwarded"
    :class="
      crafts.circle({
        class: clsx(ui?.circle, propsClass),
        size: typeof theme.size === 'string' ? theme.size : 'base',
        ...themeRest,
      })
    "
    :data-variant="variant"
    :style="typeof theme.size === 'number' && { '--size': `${theme.size}px` }"
  >
    <Progress.CircleTrack
      :class="crafts.circleTrack({ class: clsx(ui?.circleTrack), ...themeRest })"
      :data-variant="variant"
    />
    <Progress.CircleRange
      ref="range"
      :class="crafts.circleRange({ class: clsx(ui?.circleRange), ...themeRest })"
      :data-variant="variant"
      :style="transferStyles"
    />
  </Progress.Circle>
</template>
