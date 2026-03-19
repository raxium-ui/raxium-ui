<script setup lang="ts">
import type { EditablePreviewProps } from '.'
import { EditablePreview } from '@ark-ui/vue/editable'
import { useForwardProps } from '@ark-ui/vue/utils'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { computed } from 'vue'

const { class: propsClass, theme: propsTheme, ...props } = defineProps<EditablePreviewProps>()
const forwarded = useForwardProps(props)

const theme = useTheme(() => propsTheme)
const crafts = computed(() => theme.value.crafts.tvEditable())
</script>

<template>
  <EditablePreview
    v-bind="forwarded"
    :class="
      crafts.preview({
        class: [propsClass],
        ...theme,
      })
    "
  >
    <slot />
  </EditablePreview>
</template>
