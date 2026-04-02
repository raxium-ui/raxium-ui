<script setup lang="ts">
import type { InputProps } from '.'
import { ark } from '@ark-ui/vue/factory'
import { clsx } from '@raxium/themes/utils'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { CircleX } from 'lucide-vue-next'
import { computed, ref, useAttrs, useId, useTemplateRef, watch } from 'vue'

const {
  id,
  class: propsClass,
  theme: propsTheme,
  clearable = false,
  ui,
  disabled,
  readonly,
  placeholder,
  defaultValue,
  modelValue,
} = defineProps<InputProps>()
const emits = defineEmits<{
  'update:modelValue': [value: string | undefined]
  'focus': [e: FocusEvent]
  'blur': [e: FocusEvent]
  'focusin': [e: FocusEvent]
  'focusout': [e: FocusEvent]
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
const innerValue = ref<string | undefined>(modelValue ?? defaultValue ?? '')
watch(
  innerValue,
  (newVal) => {
    emits('update:modelValue', newVal)
  },
  {
    flush: 'post',
  },
)

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

function onFocusin(event: FocusEvent) {
  isFocus.value = true
  emits('focusin', event)
  emits('focus', event)
}

function onFocusout(event: FocusEvent) {
  setTimeout(() => {
    emits('focusout', event)
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
  innerValue.value = undefined
  emits('clear', new CustomEvent('clear'), innerValue.value)
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
      v-bind="$attrs"
      v-model="innerValue"
      :class="crafts.input({ class: clsx(ui?.input), ...theme })"
      :data-state="inputState"
      :placeholder="placeholder"
      :disabled="disabled ? true : undefined"
      :readonly="readonly ? true : undefined"
      @focusin="onFocusin"
      @focusout="onFocusout"
      @input="emits('input', $event, innerValue)"
      @change="emits('change', $event, innerValue)"
      @beforeinput="emits('beforeInput', $event, innerValue)"
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
