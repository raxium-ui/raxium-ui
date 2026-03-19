<script setup lang="ts">
import type { BadgeProps } from '.'
import { useForwardProps } from '@ark-ui/vue'
import { ark } from '@ark-ui/vue/factory'
import { clsx } from '@raxium/themes/utils'
import { useTheme } from '@raxium/vue/composables/useTheme'

const {
  variant,
  class: propsClass,
  theme: propsTheme,
  as = 'div',
  asChild,
  ...props
} = defineProps<BadgeProps>()
const forwarded = useForwardProps(props)

// theme
const theme = useTheme(() => propsTheme)
</script>

<template>
  <component
    :is="as === 'div' ? ark.div : ark.sup"
    v-bind="forwarded"
    :class="theme.crafts.tvBadge({ variant, class: clsx(propsClass), ...theme })"
    :data-variant="variant"
    :as-child="asChild"
  >
    <slot />
  </component>
</template>
