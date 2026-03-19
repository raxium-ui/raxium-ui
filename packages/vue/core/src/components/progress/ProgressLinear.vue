<script setup lang="ts">
import type { ProgressLinearProps } from '.'
import { useForwardProps } from '@ark-ui/vue'
import { Progress, useProgressContext } from '@ark-ui/vue/progress'
import { clsx } from '@raxium/themes/utils'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { computed, useTemplateRef } from 'vue'
import { useRangeTransfer } from './useRangeTransfer'

const {
  class: propsClass,
  theme: propsTheme,
  variant = 'default',
  ui,
  ...props
} = defineProps<ProgressLinearProps>()
const forwarded = useForwardProps(props)
const context = useProgressContext()
const itemProps = computed<any>(() => context.value.getTrackProps())

const rangeRef = useTemplateRef<{ $el: HTMLDivElement }>('range')
const { styles: transferStyles } = useRangeTransfer(
  rangeRef,
  computed(() => variant),
  'background',
)

// theme
const theme = useTheme(() => propsTheme)
const crafts = computed(() => theme.value.crafts.tvProgress())
</script>

<template>
  <Progress.Track
    v-bind="forwarded"
    :class="
      crafts.track({
        class: clsx(ui?.track, propsClass),
        orientation: itemProps['data-orientation'] ?? 'horizontal',
        ...theme,
      })
    "
    :data-variant="variant"
  >
    <Progress.Range
      ref="range"
      :class="
        crafts.range({
          class: clsx(ui?.range),
          orientation: itemProps['data-orientation'] ?? 'horizontal',
          ...theme,
        })
      "
      :data-variant="variant"
      :style="transferStyles"
    />
  </Progress.Track>
</template>
