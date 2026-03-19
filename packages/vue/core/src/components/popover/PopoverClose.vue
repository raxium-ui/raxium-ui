<script lang="ts" setup>
import type { PopoverCloseProps } from '.'
import { ark } from '@ark-ui/vue/factory'
import { PopoverCloseTrigger } from '@ark-ui/vue/popover'
import { clsx } from '@raxium/themes/utils'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { X } from 'lucide-vue-next'
import { computed } from 'vue'

const {
  class: propsClass,
  theme: propsTheme,
  asChild,
} = defineProps<PopoverCloseProps>()

// theme
const theme = useTheme(() => propsTheme)
const crafts = computed(() => theme.value.crafts.tvPopover())
</script>

<template>
  <PopoverCloseTrigger as-child>
    <slot>
      <ark.button
        v-bind="$attrs"
        :class="crafts.close({ class: clsx(propsClass), ...theme })"
        :as-child="asChild"
        :data-theme-skin="theme.skin"
        :data-theme-surface="theme.surface"
      >
        <X :style="{ width: '1lh', height: '1lh' }" />
      </ark.button>
    </slot>
  </PopoverCloseTrigger>
</template>
