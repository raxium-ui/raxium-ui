<script setup lang="ts">
import type { DrawerHeaderProps } from '.'
import { Drawer } from '@ark-ui/vue/drawer'
import { ark } from '@ark-ui/vue/factory'
import { X } from '@lucide/vue'
import { cxc } from '@raxium/themes/utils'
import { useCraft } from '@raxium/vue/composables'
import { useInheritedTheme } from '@raxium/vue/composables/useInheritedTheme'
import { useId } from 'vue'
import { DrawerCloseTrigger } from '.'
import { injectDrawerSide } from './drawer-side-context'

const { class: propsClass, theme: propsTheme, ui } = defineProps<DrawerHeaderProps>()
const id = useId()
const side = injectDrawerSide()

const theme = useInheritedTheme(() => propsTheme)
const crafts = useCraft(theme, 'tvDrawer', () => ({ side: side.value }))
</script>

<template>
  <ark.div
    :id="`drawer:${id}:header`"
    :class="crafts.header(cxc(ui?.root, propsClass))"
    data-scope="drawer"
    data-part="header"
  >
    <Drawer.Title
      :class="crafts.title(cxc(ui?.title))"
    >
      <slot />
    </Drawer.Title>
    <DrawerCloseTrigger as-child>
      <ark.button
        :class="crafts.close(cxc(ui?.close))"
      >
        <X />
        <span class="sr-only">Close</span>
      </ark.button>
    </DrawerCloseTrigger>
  </ark.div>
</template>
