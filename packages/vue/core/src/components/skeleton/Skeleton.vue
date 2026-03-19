<script setup lang="ts">
import type { SkeletonProps } from '.'
import { clsx } from '@raxium/themes/utils'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { computed } from 'vue'

const {
  class: propsClass,
  variant = 'pulse',
  shape = 'rect',
  theme: propsTheme,
} = defineProps<SkeletonProps>()

// theme
const theme = useTheme(() => propsTheme)
const crafts = computed(() => theme.value.crafts)
</script>

<template>
  <div
    :class="crafts.tvSkeleton({ class: clsx(propsClass), variant, shape, ...theme })"
    :data-shape="shape"
    :data-variant="variant"
  >
    <slot />
  </div>
</template>
