<script setup lang="ts">
import type { EditableInputProps } from '.'
import { Editable, useEditableContext } from '@ark-ui/vue/editable'
import { ark } from '@ark-ui/vue/factory'
import { useForwardProps } from '@ark-ui/vue/utils'
import { cxc } from '@raxium/themes/utils'
import { useCraft } from '@raxium/vue/composables'
import { useInheritedTheme } from '@raxium/vue/composables/useInheritedTheme'
import { CircleX } from 'lucide-vue-next'
import { ref } from 'vue'

const {
  class: propsClass,
  theme: propsTheme,
  clearable,
  ...props
} = defineProps<EditableInputProps>()

const forwarded = useForwardProps(props)
const context = useEditableContext()
const inputRef = ref<{ $el: HTMLInputElement } | null>(null)

const isFocus = ref(false)
function onFocus() {
  isFocus.value = true
}
function onBlur() {
  isFocus.value = false
}

function onClear() {
  context.value.clearValue()
  // we reforcus on next microtask to avoid blur event
  setTimeout(() => {
    inputRef.value?.$el.focus()
    isFocus.value = true
  })
}

const theme = useInheritedTheme(() => propsTheme)
const crafts = useCraft(theme, 'tvEditableInput')
</script>

<template>
  <ark.div
    :class="
      crafts.root(cxc(!context.editing && 'hidden', propsClass))
    "
    data-scope="editable"
    data-part="input-area"
    :data-state="isFocus ? 'focused' : 'idle'"
  >
    <Editable.Input
      v-bind="forwarded"
      ref="inputRef"
      :class="crafts.input(cxc(propsClass))"
      :data-state="isFocus ? 'focused' : 'idle'"
      @focus="onFocus"
      @blur="onBlur"
    />
    <slot name="clearable">
      <CircleX
        v-if="clearable && context.editing && !context.empty"
        data-scope="editable"
        data-part="clear-button"
        :class="crafts.clearable(cxc(propsClass))"
        @pointerdown.stop="onClear"
      />
    </slot>
  </ark.div>
</template>
