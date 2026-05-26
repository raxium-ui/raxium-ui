<script setup lang="ts">
import type { SelectItemGroupProps } from '.'
import { Select } from '@ark-ui/vue/select'
import { useForwardProps } from '@ark-ui/vue/utils'
import { cxc } from '@raxium/themes/utils'
import { useCraft, useInheritedTheme } from '@raxium/vue/composables'

const {
  class: propsClass,
  theme: propsTheme,
  label,
  ui,
  ...props
} = defineProps<SelectItemGroupProps>()
const forwarded = useForwardProps(props)

// theme
const theme = useInheritedTheme(() => propsTheme)
const crafts = useCraft(theme, 'tvSelect')
</script>

<template>
  <Select.ItemGroup
    v-bind="forwarded"
    :class="crafts.itemGroup(cxc(ui?.root, propsClass))"
  >
    <slot name="label">
      <Select.ItemGroupLabel :class="crafts.itemGroupLabel(cxc(ui?.label))">
        {{ label }}
      </Select.ItemGroupLabel>
    </slot>
    <slot />
  </Select.ItemGroup>
</template>
