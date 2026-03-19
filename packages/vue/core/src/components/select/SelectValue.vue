<script setup lang="ts">
import type { SelectValueProps } from '.'
import { ark } from '@ark-ui/vue/factory'
import { Select } from '@ark-ui/vue/select'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { computed } from 'vue'

const {
  class: propsClass,
  theme: propsTheme,
  asChild,
  placeholder,
} = defineProps<SelectValueProps>()

const theme = useTheme(() => propsTheme)
const crafts = computed(() => theme.value.crafts.tvSelect())
</script>

<template>
  <ark.span
    :class="crafts.value({ class: [propsClass], ...theme })"
    :as-child="asChild"
  >
    <slot>
      <Select.ValueText :placeholder="placeholder" />
    </slot>
  </ark.span>
</template>
