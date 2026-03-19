<script setup lang="ts">
import type { EditableInputProps } from '.'
import { Editable, useEditableContext } from '@ark-ui/vue/editable'
import { ark } from '@ark-ui/vue/factory'
import { useForwardProps } from '@ark-ui/vue/utils'
import { clsx } from '@raxium/themes/utils'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { CircleX } from 'lucide-vue-next'
import { computed, ref } from 'vue'

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

const theme = useTheme(() => propsTheme)
const crafts = computed(() => theme.value.crafts.tvEditableInput())
</script>

<template>
  <ark.div
    :class="
      crafts.root({
        class: clsx(!context.editing && 'hidden', propsClass),
        ...theme,
      })
    "
    data-scope="editable"
    data-part="input-area"
    :data-state="isFocus ? 'focused' : 'idle'"
  >
    <Editable.Input
      v-bind="forwarded"
      ref="inputRef"
      :class="crafts.input({ class: clsx(propsClass), ...theme })"
      :data-state="isFocus ? 'focused' : 'idle'"
      @focus="onFocus"
      @blur="onBlur"
    />
    <slot name="clearable">
      <CircleX
        v-if="clearable && context.editing && !context.empty"
        data-scope="editable"
        data-part="clear-button"
        :class="crafts.clearable({ class: clsx(propsClass), ...theme })"
        @pointerdown.stop="onClear"
      />
    </slot>
  </ark.div>
</template>
