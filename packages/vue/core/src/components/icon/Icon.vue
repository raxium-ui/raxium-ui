<script setup lang="ts">
import type { IconProps } from '.'
import { useForwardProps } from '@ark-ui/vue/utils'
import { Icon } from '@iconify/vue'
import { cxc } from '@raxium/themes/utils'
import { useCraft, useTheme } from '@raxium/vue/composables'

const { class: propsClass, theme: propsTheme, icon, craft, ...props } = defineProps<IconProps>()
const forwarded = useForwardProps(props)

// theme
const theme = useTheme(
  () => propsTheme,
  undefined,
  () => craft,
)
const crafts = useCraft(theme, 'tvIcon')
</script>

<template>
  <Icon
    v-bind="forwarded"
    :class="crafts(cxc(propsClass))"
    :icon="icon"
  />
</template>
