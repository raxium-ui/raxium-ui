<script setup lang="ts">
import type { ProgressArcProps, ProgressCircleTheme } from '.'
import { useForwardProps } from '@ark-ui/vue'
import { ark } from '@ark-ui/vue/factory'
import { Progress, useProgressContext } from '@ark-ui/vue/progress'
import { getNodeCssVar } from '@raxium/shared/css'
import { useCustomTheme } from '@raxium/vue/composables/useTheme'
import { omit } from 'es-toolkit'
import { computed, useTemplateRef } from 'vue'
import { useRangeTransfer } from './useRangeTransfer'

const {
  class: propsClass,
  theme: propsTheme,
  theta = 60,
  ui,
  variant = 'default',
  ...props
} = defineProps<ProgressArcProps>()
const forwarded = useForwardProps(props)
const context = useProgressContext()

// track
const trackRef = useTemplateRef<{ $el: HTMLDivElement }>('track')
const trackProps = computed(() => {
  const _props = context.value.getCircleTrackProps()
  delete (_props.style as any)?.strokeDasharray
  delete (_props.style as any)?.strokeDashoffset
  return _props
})
const rangeProps = computed(() => {
  const _props = context.value.getCircleRangeProps()
  delete (_props.style as any)?.strokeDasharray
  delete (_props.style as any)?.strokeDashoffset
  delete (_props.style as any)?.transform
  delete (_props.style as any)?.transformOrigin
  return _props
})
const radius = computed(() => parseInt(getNodeCssVar(trackRef.value?.$el, '--radius', '24px')))
const arc = computed(() => {
  return Math.ceil(((360 - theta) * Math.PI * radius.value) / 180)
})
const progress = computed(() => {
  return arc.value - ((context.value.percent ?? 0) / 100) * arc.value
})

// range
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
        class: [ui?.circle, propsClass],
        size: typeof theme.size === 'string' ? theme.size : 'base',
        ...themeRest,
      })
    "
    :data-variant="variant"
    :style="typeof theme.size === 'number' && { '--size': `${theme.size}px` }"
  >
    <g
      fill="none"
      :style="{
        transformOrigin: 'center center',
        transform: `rotate(${90 + theta / 2}deg)`,
      }"
    >
      <ark.circle
        v-bind="trackProps"
        ref="track"
        :class="crafts.circleTrack({ class: ui?.circleTrack, ...themeRest })"
        :data-variant="variant"
        :stroke-dasharray="`${arc} 1000`"
        stroke-dashoffset="0"
      />
      <ark.circle
        v-bind="rangeProps"
        ref="range"
        :class="crafts.circleRange({ class: ui?.circleRange, ...themeRest })"
        :data-variant="variant"
        :stroke-dasharray="`${arc} 1000`"
        :stroke-dashoffset="progress"
        :style="transferStyles"
      />
    </g>
  </Progress.Circle>
</template>
