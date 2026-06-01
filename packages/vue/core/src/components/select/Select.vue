<script setup lang="ts" generic="T extends CollectionItem">
import type { CollectionItem, UseSelectProps } from '@ark-ui/vue/select'
import type { SelectEmits, SelectProps } from '.'
import { Select, useSelect } from '@ark-ui/vue/select'
import { useForwardExpose, useForwardProps } from '@ark-ui/vue/utils'
import { cxc } from '@raxium/themes/utils'
import { useCraft, useTheme } from '@raxium/vue/composables'
import { useConfig } from '@raxium/vue/composables/useConfig'
import { useProvideComponentTheme } from '@raxium/vue/composables/useProvideComponentTheme'
import { defaults } from 'es-toolkit/compat'
import { computed, mergeProps } from 'vue'

const {
  class: propsClass,
  theme: propsTheme,
  craft,
  lazyMount = undefined,
  unmountOnExit = undefined,
  ...props
} = defineProps<SelectProps<T>>()
const emits = defineEmits<SelectEmits<T>>()
const selectConfig = useConfig('select', () => ({ lazyMount, unmountOnExit }))
const forwarded = useForwardProps(props)
const selectRoot = useSelect<T>(
  computed(
    () =>
      mergeProps(forwarded.value as Record<string, unknown>, {
        positioning: defaults(
          { ...(forwarded.value.positioning ?? {}) },
          { placement: selectConfig.value?.placement },
        ),
      }) as unknown as UseSelectProps<T>,
  ),
  emits,
)

// theme
const theme = useTheme(
  () => propsTheme,
  () => selectConfig.value?.theme,
  () => craft,
)
useProvideComponentTheme(theme, () => propsTheme)
const crafts = useCraft(theme, 'tvSelect')

// expose
defineExpose({ $api: selectRoot })
useForwardExpose()
</script>

<template>
  <Select.RootProvider
    :value="selectRoot"
    :lazy-mount="selectConfig?.lazyMount"
    :unmount-on-exit="selectConfig?.unmountOnExit"
    :class="crafts.root(cxc(propsClass))"
  >
    <slot />
    <Select.HiddenSelect />
  </Select.RootProvider>
</template>
