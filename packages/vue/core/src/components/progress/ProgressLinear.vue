<script setup lang="ts">
import type { ProgressLinearProps } from '.'
import { useForwardProps } from '@ark-ui/vue'
import { Progress, useProgressContext } from '@ark-ui/vue/progress'
import { cxc } from '@raxium/themes/utils'
import { useCraft, useTheme } from '@raxium/vue/composables'
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
const crafts = useCraft(theme, 'tvProgress', () => ({
  orientation: itemProps.value['data-orientation'] ?? 'horizontal',
  variant,
}))
</script>

<template>
  <Progress.Track
    v-bind="forwarded"
    :class="
      crafts.track(cxc(ui?.track, propsClass))
    "
    :data-variant="variant"
  >
    <Progress.Range
      ref="range"
      :class="
        crafts.range(cxc(ui?.range))
      "
      :data-variant="variant"
      :style="transferStyles"
    />
  </Progress.Track>
</template>
