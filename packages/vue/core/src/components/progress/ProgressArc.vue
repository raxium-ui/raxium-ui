<script setup lang="ts">
import type { ThemeProps } from '@raxium/vue/providers/theme'
import type { ProgressArcProps } from '.'
import { useForwardProps } from '@ark-ui/vue'
import { ark } from '@ark-ui/vue/factory'
import { Progress, useProgressContext } from '@ark-ui/vue/progress'
import { getNodeCssVar } from '@raxium/shared/css'
import { cxc } from '@raxium/themes/utils'
import { useCraft } from '@raxium/vue/composables'
import { useInheritedTheme } from '@raxium/vue/composables/useInheritedTheme'
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
const theme = useInheritedTheme(() => propsTheme as Partial<ThemeProps> | undefined)
const crafts = useCraft(theme, 'tvProgress', () => ({
  size: typeof theme.value.size === 'string' ? theme.value.size : 'base',
}))
</script>

<template>
  <Progress.Circle
    v-bind="forwarded"
    :class="crafts.circle(cxc(ui?.circle, propsClass))"
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
        :class="crafts.circleTrack(cxc(ui?.circleTrack))"
        :data-variant="variant"
        :stroke-dasharray="`${arc} 1000`"
        stroke-dashoffset="0"
      />
      <ark.circle
        v-bind="rangeProps"
        ref="range"
        :class="crafts.circleRange(cxc(ui?.circleRange))"
        :data-variant="variant"
        :stroke-dasharray="`${arc} 1000`"
        :stroke-dashoffset="progress"
        :style="transferStyles"
      />
    </g>
  </Progress.Circle>
</template>
