<script setup lang="ts">
import type { ToggleGroupItemProps } from '.'
import { useForwardProps } from '@ark-ui/vue'
import { ToggleGroup, useToggleGroupContext } from '@ark-ui/vue/toggle-group'
import { cxc } from '@raxium/themes/utils'
import { useCraft, useTheme } from '@raxium/vue/composables'
import { computed } from 'vue'

const {
  class: propsClass,
  theme: propsTheme,
  ...props
} = defineProps<ToggleGroupItemProps>()
const forwarded = useForwardProps(props)
const context = useToggleGroupContext()
const itemProps = computed<any>(() => context.value.getItemProps(forwarded.value))

// theme
const theme = useTheme(() => propsTheme)
const crafts = useCraft(theme, 'tvToggleGroup', () => ({
  orientation: itemProps.value['data-orientation'] ?? 'horizontal',
}))
</script>

<template>
  <ToggleGroup.Item
    v-bind="forwarded"
    :class="crafts.item(cxc(propsClass))"
  >
    <slot />
  </ToggleGroup.Item>
</template>
