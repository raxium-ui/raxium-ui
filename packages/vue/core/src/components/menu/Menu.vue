<script setup lang="ts">
import type { MenuRootEmits } from '@ark-ui/vue/menu'
import type { MenuProps } from '.'
import { Menu, useMenu } from '@ark-ui/vue/menu'
import { useForwardExpose, useForwardProps } from '@ark-ui/vue/utils'
import { useConfig } from '@raxium/vue/composables/useConfig'
import { useProvideComponentTheme } from '@raxium/vue/composables/useProvideComponentTheme'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { useThemeCraft } from '@raxium/vue/composables/useThemeCraft'
import { defaults } from 'es-toolkit/compat'
import { computed, mergeProps } from 'vue'

const {
  class: propsClass,
  theme: propsTheme,
  craft,
  lazyMount = undefined,
  unmountOnExit = undefined,
  ...props
} = defineProps<MenuProps>()
const emits = defineEmits<MenuRootEmits>()
const menuConfig = useConfig('menu', () => ({ lazyMount, unmountOnExit }))
const forwarded = useForwardProps(props)
const menu = useMenu(
  computed(() =>
    mergeProps(forwarded.value, {
      positioning: defaults(
        { ...(forwarded.value.positioning ?? {}) },
        { placement: menuConfig.value?.placement },
      ),
    }),
  ),
  emits,
)

// theme
const theme = useTheme(() => propsTheme, () => menuConfig.value?.theme)
const themed = useThemeCraft(theme, 'tvMenu', () => craft)
useProvideComponentTheme(themed, () => propsTheme)

// expose
defineExpose({ $api: menu })
useForwardExpose()
</script>

<template>
  <Menu.RootProvider
    :value="menu"
    :lazy-mount="menuConfig?.lazyMount"
    :unmount-on-exit="menuConfig?.unmountOnExit"
  >
    <slot />
  </Menu.RootProvider>
</template>
