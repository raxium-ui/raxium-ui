<script setup lang="ts">
import type { ProgressRootEmits } from '@ark-ui/vue/progress'
import type { ProgressProps } from '.'
import { useForwardExpose, useForwardProps } from '@ark-ui/vue'
import { Progress, useProgress } from '@ark-ui/vue/progress'
import { cxc } from '@raxium/themes/utils'
import { useCraft, useTheme, useThemeCraft } from '@raxium/vue/composables'
import { useProvideComponentTheme } from '@raxium/vue/composables/useProvideComponentTheme'

const { class: propsClass, theme: propsTheme, craft, ...props } = defineProps<ProgressProps>()
const emit = defineEmits<ProgressRootEmits>()
const forwarded = useForwardProps(props)
const progress = useProgress(forwarded, emit)

// theme
const theme = useTheme(() => propsTheme)
const themed = useThemeCraft(theme, 'tvProgress', () => craft)
useProvideComponentTheme(themed, () => propsTheme)
const crafts = useCraft(themed, 'tvProgress', () => ({
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
  >
    <slot />
  </Progress.RootProvider>
</template>
