<script setup lang="ts">
import type { EditablePreviewProps } from '.'
import { EditablePreview } from '@ark-ui/vue/editable'
import { useForwardProps } from '@ark-ui/vue/utils'
import { cxc } from '@raxium/themes/utils'
import { useCraft } from '@raxium/vue/composables'
import { useTheme } from '@raxium/vue/composables/useTheme'

const { class: propsClass, theme: propsTheme, ...props } = defineProps<EditablePreviewProps>()
const forwarded = useForwardProps(props)

const theme = useTheme(() => propsTheme)
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
