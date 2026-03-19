<script setup lang="ts">
import type { ProgressRootEmits } from '@ark-ui/vue/progress'
import type { ProgressProps } from '.'
import { useForwardExpose, useForwardProps } from '@ark-ui/vue'
import { Progress, useProgress } from '@ark-ui/vue/progress'
import { clsx } from '@raxium/themes/utils'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { ThemeProvider } from '@raxium/vue/providers/theme'
import { computed } from 'vue'

const { class: propsClass, theme: propsTheme, ...props } = defineProps<ProgressProps>()
const emit = defineEmits<ProgressRootEmits>()
const forwarded = useForwardProps(props)
const progress = useProgress(forwarded, emit)

// theme
const theme = useTheme(() => propsTheme)
const crafts = computed(() => theme.value.crafts.tvProgress())

// expose
defineExpose({ $api: progress })
useForwardExpose()
</script>

<template>
  <Progress.RootProvider
    :value="progress"
    :class="
      crafts.root({ class: clsx(propsClass), orientation: forwarded.orientation ?? 'horizontal', ...theme })
    "
  >
    <ThemeProvider :value="theme">
      <slot />
    </ThemeProvider>
  </Progress.RootProvider>
</template>
