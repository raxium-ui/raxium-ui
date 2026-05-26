<script setup lang="ts">
import type { ProgressCircleProps } from '.'
import type { ThemeProps } from '@raxium/vue/providers/theme'
import { useForwardProps } from '@ark-ui/vue'
import { Progress } from '@ark-ui/vue/progress'
import { cxc } from '@raxium/themes/utils'
import { useCraft } from '@raxium/vue/composables'
import { useInheritedTheme } from '@raxium/vue/composables/useInheritedTheme'
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
    <Progress.CircleTrack
      :class="crafts.circleTrack(cxc(ui?.circleTrack))"
      :data-variant="variant"
    />
    <Progress.CircleRange
      ref="range"
      :class="crafts.circleRange(cxc(ui?.circleRange))"
      :data-variant="variant"
      :style="transferStyles"
    />
  </Progress.Circle>
</template>
