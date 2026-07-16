<script setup lang="ts">
import type { ToggleRootEmits } from '@ark-ui/vue/toggle'
import type { ToggleProps } from '.'
import { useForwardPropsEmits } from '@ark-ui/vue'
import { Toggle } from '@ark-ui/vue/toggle'
import { cxc } from '@raxium/themes/utils'
import { useCraft, useTheme } from '@raxium/vue/composables'

const { class: propsClass, theme: propsTheme, craft, ...props } = defineProps<ToggleProps>()
const emit = defineEmits<ToggleRootEmits>()
const forwarded = useForwardPropsEmits(props, emit)

const theme = useTheme(() => propsTheme)
const crafts = useCraft(theme, 'tvToggle', undefined, () => craft)
</script>

<template>
  <Toggle.Root v-bind="forwarded" :class="crafts(cxc(propsClass))">
    <slot />
  </Toggle.Root>
</template>
