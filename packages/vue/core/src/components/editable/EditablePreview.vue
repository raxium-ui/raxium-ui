<script setup lang="ts">
import type { EditablePreviewProps } from '.'
import { EditablePreview } from '@ark-ui/vue/editable'
import { useForwardProps } from '@ark-ui/vue/utils'
import { cxc } from '@raxium/themes/utils'
import { useCraft } from '@raxium/vue/composables'
import { useInheritedTheme } from '@raxium/vue/composables/useInheritedTheme'

const { class: propsClass, theme: propsTheme, ...props } = defineProps<EditablePreviewProps>()
const forwarded = useForwardProps(props)

const theme = useInheritedTheme(() => propsTheme)
const crafts = useCraft(theme, 'tvEditable')
</script>

<template>
  <EditablePreview
    v-bind="forwarded"
    :class="crafts.preview(cxc(propsClass))"
  >
    <slot />
  </EditablePreview>
</template>
