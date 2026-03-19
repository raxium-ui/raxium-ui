<script setup lang="ts">
import type { SelectItemProps } from '.'
import { Select } from '@ark-ui/vue/select'
import { useForwardProps } from '@ark-ui/vue/utils'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { Check } from 'lucide-vue-next'
import { computed } from 'vue'

const { class: propsClass, theme: propsTheme, ...props } = defineProps<SelectItemProps>()
const forwarded = useForwardProps(props)

// theme
const theme = useTheme(() => propsTheme)
const crafts = computed(() => theme.value.crafts.tvSelect())
</script>

<template>
  <Select.Item
    v-bind="forwarded"
    :class="crafts.item({ class: [propsClass], ...theme })"
  >
    <Select.ItemText>
      <slot />
    </Select.ItemText>
    <slot name="indicator">
      <Select.ItemIndicator :class="crafts.itemIndicator({ ...theme })">
        <Check :style="{ width: '0.875lh', height: '0.875lh' }" />
      </Select.ItemIndicator>
    </slot>
  </Select.Item>
</template>
