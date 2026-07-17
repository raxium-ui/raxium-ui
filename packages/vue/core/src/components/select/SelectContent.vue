<script setup lang="ts">
import type { SelectContentProps } from '.'
import { ark } from '@ark-ui/vue/factory'
import { Select } from '@ark-ui/vue/select'
import { useForwardProps } from '@ark-ui/vue/utils'
import { cxc } from '@raxium/themes/utils'
import {
  useCraft,
  useInheritedTheme,
  useProvideStructuralComponentTheme,
  useTeleportDetection,
  useTeleportedDepthOwner,
} from '@raxium/vue/composables'
import { computed } from 'vue'

const { class: propsClass, theme: propsTheme, ui, ...props } = defineProps<SelectContentProps>()
const forwarded = useForwardProps(props)

// teleport detection + depth (same band as Menu when portaled)
const { isTeleported, setElementRef: setPositionerRef } = useTeleportDetection()
const depth = useTeleportedDepthOwner({
  type: 'menu',
  active: isTeleported,
  fallbackZIndex: 'var(--z-dropdown, var(--z-index))',
})

const theme = useInheritedTheme(() => propsTheme)
useProvideStructuralComponentTheme(theme, () => propsTheme)
const crafts = useCraft(theme, 'tvSelect')
const positionerStyle = computed(() => ({
  '--rui-z-index': isTeleported.value ? depth.zIndex.value : 'auto',
}))
</script>

<template>
  <Select.Positioner
    :ref="setPositionerRef"
    :class="ui?.positioner"
    :style="positionerStyle"
  >
    <Select.Content
      v-bind="forwarded"
      :class="crafts.content(cxc(ui?.root, propsClass))"
    >
      <ark.div
        data-scope="select"
        data-part="content-inner"
        :class="crafts.contentInner(cxc(ui?.inner))"
      >
        <slot />
      </ark.div>
    </Select.Content>
  </Select.Positioner>
</template>
