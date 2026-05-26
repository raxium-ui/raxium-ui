<script setup lang="ts">
import type { ProgressRootEmits } from '@ark-ui/vue/progress'
import type { ProgressProps } from '.'
import { useForwardExpose, useForwardProps } from '@ark-ui/vue'
import { Progress, useProgress } from '@ark-ui/vue/progress'
import { cxc } from '@raxium/themes/utils'
import { useCraft, useTheme } from '@raxium/vue/composables'
import { useProvideComponentTheme } from '@raxium/vue/composables/useProvideComponentTheme'

const { class: propsClass, theme: propsTheme, craft, ...props } = defineProps<ProgressProps>()
const emit = defineEmits<ProgressRootEmits>()
const forwarded = useForwardProps(props)
const progress = useProgress(forwarded, emit)

// theme
const theme = useTheme(() => propsTheme, undefined, () => craft)
useProvideComponentTheme(theme, () => propsTheme)
const crafts = useCraft(theme, 'tvProgress', () => ({
  orientation: forwarded.value.orientation ?? 'horizontal',
}))

// expose
defineExpose({ $api: progress })
useForwardExpose()
</script>

<template>
  <Progress.RootProvider
    :value="progress"
    :class="crafts.root(cxc(propsClass))"
  >      <slot />  </Progress.RootProvider>
</template>
