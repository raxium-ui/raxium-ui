<script setup lang="ts">
import type { DrawerGrabberProps } from '.'
import { Drawer } from '@ark-ui/vue/drawer'
import { cxc } from '@raxium/themes/utils'
import { useCraft } from '@raxium/vue/composables'
import { useInheritedTheme } from '@raxium/vue/composables/useInheritedTheme'
import { injectDrawerSide } from './drawer-side-context'

const { class: propsClass, theme: propsTheme, ui } = defineProps<DrawerGrabberProps>()
const side = injectDrawerSide()

const theme = useInheritedTheme(() => propsTheme)
const crafts = useCraft(theme, 'tvDrawer', () => ({ side: side.value }))
</script>

<template>
  <Drawer.Grabber :class="crafts.grabber(cxc(ui?.root, propsClass))">
    <slot>
      <Drawer.GrabberIndicator
        :class="crafts.grabberIndicator(cxc(ui?.indicator))"
      />
    </slot>
  </Drawer.Grabber>
</template>
