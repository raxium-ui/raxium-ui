<script setup lang="ts">
import type { BadgeProps } from '.'
import { useForwardProps } from '@ark-ui/vue'
import { ark } from '@ark-ui/vue/factory'
import { cxc } from '@raxium/themes/utils'
import { useCraft } from '@raxium/vue/composables/useCraft'
import { useTheme } from '@raxium/vue/composables/useTheme'

const {
  craft,
  class: propsClass,
  theme: propsTheme,
  as = 'div',
  asChild,
  variant,
  ...props
} = defineProps<BadgeProps>()
const forwarded = useForwardProps(props)

// theme — tvBadge is base-only, so crafts() returns a string
const theme = useTheme(() => propsTheme)
const crafts = useCraft(theme, 'tvBadge', () => ({ variant }), () => craft)
</script>

<template>
  <component
    :is="as === 'div' ? ark.div : ark.sup"
    v-bind="forwarded"
    :class="crafts(cxc(propsClass))"
    :data-variant="variant"
    :as-child="asChild"
  >
    <slot />
  </component>
</template>
