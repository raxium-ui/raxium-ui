<script setup lang="ts">
import type { SelectValueProps } from '.'
import { ark } from '@ark-ui/vue/factory'
import { Select } from '@ark-ui/vue/select'
import { cxc } from '@raxium/themes/utils'
import { useCraft, useTheme } from '@raxium/vue/composables'

const {
  class: propsClass,
  theme: propsTheme,
  asChild,
  placeholder,
} = defineProps<SelectValueProps>()

const theme = useTheme(() => propsTheme)
const crafts = useCraft(theme, 'tvSelect')
</script>

<template>
  <ark.span
    :class="crafts.value(cxc(propsClass))"
    :as-child="asChild"
  >
    <slot>
      <Select.ValueText :placeholder="placeholder" />
    </slot>
  </ark.span>
</template>
