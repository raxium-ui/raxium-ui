<script setup lang="ts">
import type { BadgeVariants } from '@raxium/themes/default'
import type { BadgeProps } from '.'
import { useForwardProps } from '@ark-ui/vue'
import { ark } from '@ark-ui/vue/factory'
import { clsx } from '@raxium/themes/utils'
import { useCraft } from '@raxium/vue/composables/useCraft'
import { useTheme } from '@raxium/vue/composables/useTheme'

const {
  variant,
  craft,
  class: propsClass,
  theme: propsTheme,
  as = 'div',
  asChild,
  ...props
} = defineProps<BadgeProps>()
const forwarded = useForwardProps(props)

// theme — tvBadge is base-only, so crafts() returns a string
const theme = useTheme(() => propsTheme)
const crafts = useCraft(theme, 'tvBadge', () => ({
  variant: variant as BadgeVariants['variant'],
}))
</script>

<template>
  <component
    :is="as === 'div' ? ark.div : ark.sup"
    v-bind="forwarded"
    :class="crafts({ class: clsx(propsClass) })"
    :data-variant="variant"
    :as-child="asChild"
  >
    <slot />
  </component>
</template>
