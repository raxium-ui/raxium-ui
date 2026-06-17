<script setup lang="ts">
import type { RadioGroupLayoutProps } from './props'
import { cxc } from '@raxium/themes/utils'
import { useCraft, useInheritedTheme } from '@raxium/vue/composables'

const { class: propsClass, layout = 'stack' } = defineProps<RadioGroupLayoutProps>()

const theme = useInheritedTheme()
const crafts = useCraft(theme, 'tvRadioGroup', () => ({ layout }))
</script>

<template>
  <div
    :class="crafts.layout(cxc(propsClass))"
    data-scope="radio-group"
    data-part="layout"
  >
    <slot />
  </div>
</template>
