<script setup lang="ts">
import type { DrawerBackdropProps } from '.'
import { useForwardExpose, usePresenceContext } from '@ark-ui/vue'
import { useDrawerContext } from '@ark-ui/vue/drawer'
import { ark } from '@ark-ui/vue/factory'
import { cxc } from '@raxium/themes/utils'
import { useCraft } from '@raxium/vue/composables'
import { useInheritedTheme } from '@raxium/vue/composables/useInheritedTheme'
import { omit } from 'es-toolkit'
import { computed, mergeProps, useAttrs } from 'vue'
import { injectDrawerSide } from './drawer-side-context'

defineOptions({
  inheritAttrs: false,
})

const { class: propsClass, theme: propsTheme, asChild } = defineProps<DrawerBackdropProps>()

const drawer = useDrawerContext()
const presence = usePresenceContext()
const attrs = useAttrs()
const side = injectDrawerSide()

const mergedProps = computed(() => {
  const parts: Array<Record<string, unknown>> = [
    drawer.value.getBackdropProps() as Record<string, unknown>,
    omit(presence.value.presenceProps, ['ref']) as Record<string, unknown>,
    attrs as unknown as Record<string, unknown>,
  ]
  return mergeProps(...parts)
})

const theme = useInheritedTheme(() => propsTheme)
const crafts = useCraft(theme, 'tvDrawer', () => ({ side: side.value }))

useForwardExpose()
</script>

<template>
  <ark.div
    v-if="!presence.unmounted"
    v-bind="mergedProps"
    :class="crafts.backdrop(cxc(propsClass))"
    :as-child="asChild"
  >
    <slot />
  </ark.div>
</template>
