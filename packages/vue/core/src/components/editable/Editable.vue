<script setup lang="ts">
import type { EditableRootEmits, UseEditableProps } from '@ark-ui/vue/editable'
import type { EditableProps } from '.'
import { EditableArea, EditableRootProvider, useEditable } from '@ark-ui/vue/editable'
import { useForwardExpose, useForwardProps } from '@ark-ui/vue/utils'
import { findUp } from '@raxium/shared/dom'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { ThemeProvider } from '@raxium/vue/providers/theme'
import { computed } from 'vue'

type SlotProps = {
  editing: boolean
  empty: boolean
  value: string
}

const {
  class: propsClass,
  theme: propsTheme,
  clearable,
  ui,
  ...props
} = defineProps<EditableProps>()
const emits = defineEmits<Omit<EditableRootEmits, 'onInteractOutside'>>()
defineSlots<{
  prefix: (props: SlotProps) => any
  suffix: (props: SlotProps) => any
  default: (props: SlotProps) => any
}>()

// useForwardProps 收窄传递的props
const forwarded = useForwardProps<EditableProps, UseEditableProps>(props)
const editable = useEditable(
  computed(() => {
    return {
      ...forwarded.value,
      onInteractOutside: (event) => {
        // event.detail.target could be element triggered the event
        const target = event.detail.target as HTMLElement
        const exceptParts = ['input-area', 'clear-button']
        if (
          findUp(target, (node) => {
            return (
              node.dataset.scope === 'editable' && exceptParts.includes(node.dataset.part ?? '')
            )
          })
        ) {
          event.preventDefault()
          forwarded.value.onInteractOutside?.(event)
        }
      },
    }
  }),
  emits,
)
const slotProps = computed<SlotProps>(() => {
  return {
    editing: editable.value.editing,
    empty: editable.value.empty,
    value: editable.value.value,
  }
})

// theme
const theme = useTheme(() => propsTheme)
const crafts = computed(() => theme.value.crafts.tvEditable())

// expose
defineExpose({ $api: editable })
useForwardExpose()
</script>

<template>
  <EditableRootProvider
    :value="editable"
    :class="crafts.root({ class: [ui?.root, propsClass], ...theme })"
  >
    <ThemeProvider :value="theme">
      <slot
        name="prefix"
        v-bind="slotProps"
      />
      <EditableArea :class="crafts.area({ class: [ui?.area, propsClass], ...theme })">
        <slot v-bind="slotProps" />
      </EditableArea>
      <slot
        name="suffix"
        v-bind="slotProps"
      />
    </ThemeProvider>
  </EditableRootProvider>
</template>
