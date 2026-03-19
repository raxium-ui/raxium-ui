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
  'update:modelValue': [value: string | number]
  'focus': [e: Event]
  'blur': [e: Event]
  'input': [e: Event, value: string | number | undefined]
  'change': [e: Event, value: string | number | undefined]
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
function onBlur(event: Event) {
  setTimeout(() => {
    emits('blur', event)
    if (rejectBlur.value) {
      rejectBlur.value = false
      return
    }
    isFocus.value = false
  })
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
      :id="id ?? inputId"
      ref="input"
      v-model="modelValue"
      :class="crafts.input({ class: clsx(ui?.input), ...theme })"
      :placeholder="placeholder"
      :data-state="inputState"
      :disabled="disabled ? true : undefined"
      :readonly="readonly ? true : undefined"
      :maxlength="maxlength"
      @focus="
        (event: Event) => {
          isFocus = true;
          emits('focus', event);
        }
      "
      @blur="onBlur"
      @input="(e: Event) => emits('input', e, modelValue)"
      @change="(e: Event) => emits('change', e, modelValue)"
    >
    <ark.div
      v-if="inputState === 'focused' && clearable && modelValue"
      :class="crafts.clearable({ class: clsx(ui?.clearable), ...theme })"
      @mousedown.stop="
        () => {
          rejectBlur = true
          inputRef?.focus()
          modelValue = ''
        }
      "
    >
      <CircleX />
    </ark.div>
    <slot name="suffix" />
  </ark.div>
</template>
