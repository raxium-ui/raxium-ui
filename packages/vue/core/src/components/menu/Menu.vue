<script setup lang="ts">
import type { MenuRootEmits } from '@ark-ui/vue/menu'
import type { MenuProps } from '.'
import { Menu, useMenu } from '@ark-ui/vue/menu'
import { useForwardExpose, useForwardProps } from '@ark-ui/vue/utils'
import { useConfig } from '@raxium/vue/composables/useConfig'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { ThemeProvider } from '@raxium/vue/providers/theme'
import { defaults } from 'es-toolkit/compat'
import { computed, mergeProps } from 'vue'

const {
  class: propsClass,
  theme: propsTheme,
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
const theme = useTheme(() => ({ ...menuConfig.value?.theme, ...propsTheme }))

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
    <ThemeProvider :value="theme">
      <slot />
    </ThemeProvider>
  </Menu.RootProvider>
</template>
