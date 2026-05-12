<script setup lang="ts">
import type { InputProps } from '.'
import { cxc } from '@raxium/themes/utils'
import { useCraft, useTheme } from '@raxium/vue/composables'
import { CircleX } from 'lucide-vue-next'
import { computed, ref, useId, useTemplateRef, watch } from 'vue'

const {
  id,
  class: propsClass,
  theme: propsTheme,
  craft,
  clearable = false,
  ui,
  disabled,
  readonly,
  placeholder,
  defaultValue,
  modelValue,
  maxlength,
  minlength,
  type,
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
watch(() => modelValue, (newVal?: string) => {
  innerValue.value = newVal ?? ''
})
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
const theme = useTheme(() => propsTheme, () => craft)
const crafts = useCraft(theme, 'tvInput')
</script>

<template>
  <div
    :class="crafts.root(cxc(ui?.root, propsClass))"
    :data-state="inputState"
  >
    <slot name="prefix" />
    <input
      v-bind="$attrs"
      :id="id ?? `input:${inputId}`"
      ref="input"
      v-model="innerValue"
      :class="crafts.input(cxc(ui?.input))"
      :data-state="inputState"
      :placeholder="placeholder"
      :disabled="disabled ? true : undefined"
      :readonly="readonly ? true : undefined"
      :maxlength="maxlength"
      :minlength="minlength"
      :type="type"
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
    <div
      v-if="inputState === 'focused' && clearable && modelValue"
      :class="crafts.clearable(cxc(ui?.clearable))"
      @mousedown.stop="onClear"
    >
      <CircleX />
    </div>
    <slot name="suffix" />
  </div>
</template>
