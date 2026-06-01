<script setup lang="ts">
import type { SelectItemProps } from '.'
import { Select } from '@ark-ui/vue/select'
import { useForwardProps } from '@ark-ui/vue/utils'
import { cxc } from '@raxium/themes/utils'
import { useCraft, useInheritedTheme } from '@raxium/vue/composables'
import { Check } from 'lucide-vue-next'

const { class: propsClass, theme: propsTheme, ...props } = defineProps<SelectItemProps>()
const forwarded = useForwardProps(props)

// theme
const theme = useInheritedTheme(() => propsTheme)
const crafts = useCraft(theme, 'tvSelect')
</script>

<template>
  <Select.Item
    v-bind="forwarded"
    :class="crafts.item(cxc(propsClass))"
  >
    <Select.ItemText>
      <slot />
    </Select.ItemText>
    <slot name="indicator">
      <Select.ItemIndicator :class="crafts.itemIndicator()">
        <Check />
      </Select.ItemIndicator>
    </slot>
  </Select.Item>
</template>
