<script setup lang="ts">
import type { InputProps } from '.'
import { ark } from '@ark-ui/vue/factory'
import { clsx } from '@raxium/themes/utils'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { useVModel } from '@vueuse/core'
import { CircleX } from 'lucide-vue-next'
import { computed, ref, useId, useTemplateRef } from 'vue'

const {
  id,
  class: propsClass,
  theme: propsTheme,
  clearable = false,
  ui,
  disabled,
  readonly,
  defaultValue,
  placeholder,
  maxlength,
  ...props
} = defineProps<InputProps>()
const emits = defineEmits<{
  'update:modelValue': [value: string]
  'focus': [e: FocusEvent]
  'blur': [e: FocusEvent]
  'input': [e: InputEvent, value: string | undefined]
  'change': [e: Event, value: string | undefined]
  'clear': [e: Event, value: string | undefined]
  'beforeInput': [e: InputEvent, value: string | undefined]
  'compositionStart': [e: CompositionEvent]
  'compositionEnd': [e: CompositionEvent]
  'keydown': [e: KeyboardEvent]
  'keyup': [e: KeyboardEvent]
}>()

const inputId = useId()
const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue,
})

const isFocus = ref(false)
const inputState = computed(() => {
  if (disabled)
    return 'disabled'
  if (readonly)
    return 'readonly'
  return isFocus.value ? 'focused' : 'blur'
})

const inputRef = useTemplateRef<HTMLInputElement | null>('input')
const rejectBlur = ref(false)

function onFocus(event: FocusEvent) {
  isFocus.value = true
  emits('focus', event)
}

function onBlur(event: FocusEvent) {
  setTimeout(() => {
    emits('blur', event)
    if (rejectBlur.value) {
      rejectBlur.value = false
      return
    }
    isFocus.value = false
  })
}

function onClear() {
  rejectBlur.value = true
  inputRef.value?.focus()
  modelValue.value = ''
  emits('clear', new CustomEvent('clear'), modelValue.value)
}

// theme
const theme = useTheme(() => propsTheme)
const crafts = computed(() => theme.value.crafts.tvInput())
</script>

<template>
  <ark.div
    :as-child="false"
    :class="crafts.root({ class: clsx(ui?.root, propsClass), ...theme })"
    :data-state="inputState"
  >
    <slot name="prefix" />
    <input
      :id="id ?? `input:${inputId}`"
      ref="input"
      v-model="modelValue"
      :class="crafts.input({ class: clsx(ui?.input), ...theme })"
      :placeholder="placeholder"
      :data-state="inputState"
      :disabled="disabled ? true : undefined"
      :readonly="readonly ? true : undefined"
      :maxlength="maxlength"
      @focus="onFocus"
      @blur="onBlur"
      @input="emits('input', $event, modelValue)"
      @change="emits('change', $event, modelValue)"
      @beforeinput="emits('beforeInput', $event, modelValue)"
      @compositionstart="emits('compositionStart', $event)"
      @compositionend="emits('compositionEnd', $event)"
      @keydown="emits('keydown', $event)"
      @keyup="emits('keyup', $event)"
    >
    <ark.div
      v-if="inputState === 'focused' && clearable && modelValue"
      :class="crafts.clearable({ class: clsx(ui?.clearable), ...theme })"
      @mousedown.stop="onClear"
    >
      <CircleX />
    </ark.div>
    <slot name="suffix" />
  </ark.div>
</template>
