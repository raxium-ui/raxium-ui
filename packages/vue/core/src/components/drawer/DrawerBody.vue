<script setup lang="ts">
import type { DrawerBodyProps } from '.'
import { useForwardProps } from '@ark-ui/vue'
import { ark } from '@ark-ui/vue/factory'
import { cxc } from '@raxium/themes/utils'
import { useCraft } from '@raxium/vue/composables'
import { useInheritedTheme } from '@raxium/vue/composables/useInheritedTheme'
import { useId } from 'vue'
import { injectDrawerSide } from './drawer-side-context'

const { class: propsClass, theme: propsTheme, ...props } = defineProps<DrawerBodyProps>()
const forwarded = useForwardProps(props)

const id = useId()
const side = injectDrawerSide()
const theme = useInheritedTheme(() => propsTheme)
const crafts = useCraft(theme, 'tvDrawer', () => ({ side: side.value }))
</script>

<template>
  <ark.div
    v-bind="forwarded"
    :id="`drawer:${id}:body`"
    :class="crafts.body(cxc(propsClass))"
    data-scope="drawer"
    data-part="body"
  >
    <slot />
  </ark.div>
</template>
