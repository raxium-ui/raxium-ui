<script setup lang="ts">
import type { SkeletonProps } from '.'
import { cxc } from '@raxium/themes/utils'
import { useCraft, useTheme } from '@raxium/vue/composables'

const {
  class: propsClass,
  variant = 'pulse',
  shape = 'rect',
  theme: propsTheme,
  craft,
} = defineProps<SkeletonProps>()

// theme
const theme = useTheme(() => propsTheme)
const crafts = useCraft(theme, 'tvSkeleton', () => ({
  variant,
  shape,
}), () => craft)
</script>

<template>
  <div
    :class="crafts(cxc(propsClass))"
    :data-shape="shape"
    :data-variant="variant"
  >
    <slot />
  </div>
</template>
