<script lang="ts" setup>
import type { PopoverCloseProps } from '.'
import { ark } from '@ark-ui/vue/factory'
import { PopoverCloseTrigger } from '@ark-ui/vue/popover'
import { cxc } from '@raxium/themes/utils'
import { useCraft, useTheme, useThemeAttrs } from '@raxium/vue/composables'
import { X } from 'lucide-vue-next'

const {
  class: propsClass,
  theme: propsTheme,
  asChild,
} = defineProps<PopoverCloseProps>()

// theme
const theme = useTheme(() => propsTheme)
const crafts = useCraft(theme, 'tvPopover')
const themeAttrs = useThemeAttrs(theme)
</script>

<template>
  <PopoverCloseTrigger as-child>
    <slot>
      <ark.button
        v-bind="{ ...$attrs, ...themeAttrs }"
        :class="crafts.close(cxc(propsClass))"
        :as-child="asChild"
      >
        <X :style="{ width: '1lh', height: '1lh' }" />
      </ark.button>
    </slot>
  </PopoverCloseTrigger>
</template>
