<script setup lang="ts">
import type { ToggleGroupItemProps } from '.'
import { useForwardProps } from '@ark-ui/vue'
import { ToggleGroup, useToggleGroupContext } from '@ark-ui/vue/toggle-group'
import { clsx } from '@raxium/themes/utils'
import { useTheme } from '@raxium/vue/composables/useTheme'
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
const crafts = computed(() => theme.value.crafts.tvToggleGroup())
</script>

<template>
  <ToggleGroup.Item
    v-bind="forwarded"
    :class="
      crafts.item({
        class: clsx(propsClass),
        orientation: itemProps['data-orientation'] ?? 'horizontal',
        ...theme,
      })
    "
  >
    <slot />
  </ToggleGroup.Item>
</template>
