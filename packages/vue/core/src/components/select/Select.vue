<script setup lang="ts" generic="T extends CollectionItem">
import type { CollectionItem, UseSelectProps } from '@ark-ui/vue/select'
import type { SelectEmits, SelectProps } from '.'
import { Select, useSelect } from '@ark-ui/vue/select'
import { useForwardExpose, useForwardProps } from '@ark-ui/vue/utils'
import { clsx } from '@raxium/themes/utils'
import { useConfig } from '@raxium/vue/composables/useConfig'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { ThemeProvider } from '@raxium/vue/providers/theme'
import { computed } from 'vue'

const {
  class: propsClass,
  theme: propsTheme,
  lazyMount = undefined,
  unmountOnExit = undefined,
  ...props
} = defineProps<SelectProps<T>>()
const emits = defineEmits<SelectEmits<T>>()
const selectConfig = useConfig('select', () => ({ lazyMount, unmountOnExit }))

const selectRoot = useSelect<T>(useForwardProps(props) as unknown as UseSelectProps<T>, emits)

// theme
const theme = useTheme(() => ({ ...selectConfig.value?.theme, ...propsTheme }))
const crafts = computed(() => theme.value.crafts.tvSelect())

// expose
defineExpose({ $api: selectRoot })
useForwardExpose()
</script>

<template>
  <Select.RootProvider
    :value="selectRoot"
    :lazy-mount="selectConfig?.lazyMount"
    :unmount-on-exit="selectConfig?.unmountOnExit"
    :class="crafts.root({ class: clsx(propsClass), ...theme })"
  >
    <ThemeProvider :value="theme">
      <slot />
    </ThemeProvider>
    <Select.HiddenSelect />
  </Select.RootProvider>
</template>
