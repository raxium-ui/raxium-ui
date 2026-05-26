<script setup lang="ts">
import type { SelectContentProps } from '.'
import { ark } from '@ark-ui/vue/factory'
import { Select } from '@ark-ui/vue/select'
import { useForwardProps } from '@ark-ui/vue/utils'
import { cxc } from '@raxium/themes/utils'
import { useCraft, useInheritedTheme } from '@raxium/vue/composables'

const { class: propsClass, theme: propsTheme, ui, ...props } = defineProps<SelectContentProps>()
const forwarded = useForwardProps(props)

const theme = useInheritedTheme(() => propsTheme)
const crafts = useCraft(theme, 'tvSelect')
</script>

<template>
  <Select.Positioner>
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
