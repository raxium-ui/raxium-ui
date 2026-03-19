<script setup lang="ts">
import type { HotkeyProps } from '.'
import { ark } from '@ark-ui/vue/factory'
import { useForwardExpose } from '@ark-ui/vue/utils'
import { clsx } from '@raxium/themes/utils'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { isEmpty, without } from 'es-toolkit/compat'
import { computed, nextTick, reactive, ref, watch, watchEffect } from 'vue'
import { CodesMap, isAccebilityCode, isAssistCode, isDeleteCode, isMainCode } from './keycode'

const {
  class: propsClass,
  hotkey,
  placeholder: propsPlaceholder = '',
  disabled,
  readonly,
  theme: propsTheme,
  ui,
} = defineProps<HotkeyProps>()

const emits = defineEmits<{
  'update:hotkey': [value: string]
  'focus': [event: Event]
  'blur': [event: Event]
  'error': [error: Error]
  'cancel': [keycodes: string[], hotkey: string]
  'change': [keycodes: string[], hotkey: string]
}>()
const { forwardRef, currentElement } = useForwardExpose()

const isFocus = ref(false)
const inputState = computed(() => {
  if (disabled)
    return 'disabled'
  if (readonly)
    return 'readonly'
  return isFocus.value ? 'focused' : 'blur'
})

function onFocus(event: Event) {
  isFocus.value = true
  moveSelectionArchor()
  emits('focus', event)
}
function onBlur(event: Event) {
  isFocus.value = false
  setInnerHotkey()
  resetData()
  emits('blur', event)
}

const innerHotkey = ref(hotkey)
const placeholder = ref('')

function setInnerHotkey(hk?: string) {
  const _hotkey = hk || hotkey
  const _placeholder
    = typeof propsPlaceholder === 'function' ? propsPlaceholder(isFocus.value) : propsPlaceholder
  if (isEmpty(_hotkey)) {
    if (isFocus.value) {
      placeholder.value = _placeholder || 'Press hotkey'
    }
    else {
      placeholder.value = _placeholder || 'No hotkey assigned'
    }
  }
  innerHotkey.value = _hotkey
}
watch(() => hotkey, setInnerHotkey, { immediate: true })

const keydownRecord = reactive({
  mainCode: '',
  assistCodes: [] as string[],
})
const judgeKeyArr = ref([] as string[])
const resultCodeArr = ref([] as string[])
function onKeydown(event: KeyboardEvent) {
  const { keyCode, code, repeat } = event
  event.preventDefault()
  event.stopPropagation()
  // ESC || backspace
  if (!repeat && (isDeleteCode(code) || isAccebilityCode(code)))
    return false
  // 消除repeat
  if (repeat)
    return false
  // keyCode 出现大于等于229的情况 代表该hotkey被占用, 无法识别keydown, 但是在keyup中可以捕获
  if (keyCode >= 229)
    return false
  // 如果记录了 mainKey return
  if (keydownRecord.mainCode === code)
    return false
  // 如果记录了 assist key return

  if (keydownRecord.assistCodes.includes(code))
    return false

  // 记录下过滤后的 code 信息
  if (isMainCode(code)) {
    keydownRecord.mainCode = code
  }
  else if (isAssistCode(code)) {
    keydownRecord.assistCodes.push(code)
  }

  judgeKeyArr.value = [...judgeKeyArr.value, code]

  // 处理输入框显示
  moveSelectionArchor()
  const assistStr = keydownRecord.assistCodes.reduce((acc, c) => {
    return acc === '' ? CodesMap[c].name : `${acc} + ${CodesMap[c].name}`
  }, '')

  innerHotkey.value = keydownRecord.mainCode
    ? `${
      isEmpty(assistStr)
        ? CodesMap[keydownRecord.mainCode].name
        : `${assistStr} + ${CodesMap[keydownRecord.mainCode].name}`
    }`
    : assistStr
}

const keyupSet = ref<Set<string>>(new Set())
function onKeyUp(event: KeyboardEvent) {
  const { code } = event
  event.preventDefault()
  event.stopPropagation()
  if (isAccebilityCode(code)) {
    code === 'Escape' && currentElement.value?.blur()
    return
  }
  if (isDeleteCode(code)) {
    // ESC || backspace
    if (innerHotkey.value) {
      innerHotkey.value = ''
      resetData()
      emits('update:hotkey', '')
      emits('cancel', [], 'ESC')
      emits('change', [], 'ESC')
    }
    return
  }

  // 因为热键冲突的原因, keydown无法捕获到主键(mainCode), 但在keyup中可以捕获到
  // 所以记录一份keyup set用于补充主键
  keyupSet.value.add(code)

  // 依次清空judge array, 从而触发watch
  if (judgeKeyArr.value.includes(code)) {
    judgeKeyArr.value.splice(judgeKeyArr.value.indexOf(code), 1)
  }
}

const IMELocked = ref(false)
function onInput() {
  IMELocked.value = true
  setInnerHotkey()
}

/**
 * 将光标移至最后
 */
function moveSelectionArchor() {
  nextTick(() => {
    const selection = window.getSelection()
    const range = selection?.getRangeAt(0)
    // @ts-expect-error range have setStart method
    range?.setStart(range.startContainer, range.startContainer.length)
    // @ts-expect-error range have setEnd method
    range?.setEnd(range.startContainer, range.startContainer.length)
    selection?.removeAllRanges()
    range && selection?.addRange(range)
  })
}

function resetData() {
  keydownRecord.mainCode = ''
  keydownRecord.assistCodes = []
  keyupSet.value.clear()
  judgeKeyArr.value = []
  resultCodeArr.value = []
}

watchEffect((cleanup) => {
  if (judgeKeyArr.value.length === 0 && inputState.value === 'focused') {
    if (IMELocked.value) {
      // 如果IME是输入状态 直接返回
      IMELocked.value = false
      setInnerHotkey()
      if (currentElement.value) {
        ;(currentElement.value as HTMLInputElement).value = innerHotkey.value
        currentElement.value.blur()
      }
      emits('error', new Error('IME is active, please close it before inputing'))
      return
    }
    // keydown未捕获到maincode
    if (!keydownRecord.mainCode) {
      // 在keyup Set中找一个主键
      let keyupMainCode = null
      keyupSet.value.forEach((c) => {
        isMainCode(c) && (keyupMainCode = c)
      })
      // 仍然没找到主键, 还原设置
      if (!keyupMainCode) {
        setInnerHotkey()
        resetData()
        return
      }
      // 否则, 重新记录keydown中的mainCode
      keydownRecord.mainCode = keyupMainCode
    }

    // resultCodeArr.value = []
    if (isEmpty(keydownRecord.assistCodes)) {
      // keydown未捕获assistCode, 给一个默认值
      resultCodeArr.value = keydownRecord.assistCodes = ['ControlLeft', 'ShiftLeft']
    }
    else {
      // 如果有, 需要重排 assist code 顺序
      if (
        keydownRecord.assistCodes.includes('ControlLeft')
        || keydownRecord.assistCodes.includes('ControlRight')
      ) {
        resultCodeArr.value.push('ControlLeft')
      }
      if (
        keydownRecord.assistCodes.includes('AltLeft')
        || keydownRecord.assistCodes.includes('AltRight')
      ) {
        resultCodeArr.value.push('AltLeft')
      }
      if (
        keydownRecord.assistCodes.includes('ShiftLeft')
        || keydownRecord.assistCodes.includes('ShiftRight')
      ) {
        resultCodeArr.value.push('ShiftLeft')
      }
      resultCodeArr.value = resultCodeArr.value.concat(
        without(
          keydownRecord.assistCodes,
          'ControlLeft',
          'ControlRight',
          'AltLeft',
          'AltRight',
          'ShiftLeft',
          'ShiftRight',
        ),
      )
    }
    resultCodeArr.value.push(keydownRecord.mainCode)
    innerHotkey.value = resultCodeArr.value.map(c => CodesMap[c].name).join(' + ')
    emits('update:hotkey', innerHotkey.value)
    emits('change', resultCodeArr.value, innerHotkey.value)
    currentElement.value?.blur()
    cleanup(resetData)
  }
})

// theme
const theme = useTheme(() => propsTheme)
const crafts = computed(() => theme.value.crafts.tvHotkey())
</script>

<template>
  <ark.div
    :class="crafts.root({ class: clsx(ui?.root, propsClass), ...theme })"
    :data-placeholder="placeholder"
    :data-state="inputState"
  >
    <ark.input
      :ref="forwardRef"
      :class="crafts.input({ class: clsx(ui?.input), ...theme })"
      :disabled="disabled ? true : undefined"
      :spellcheck="false"
      :data-state="inputState"
      :readonly="readonly ? true : undefined"
      :placeholder="placeholder"
      :value="innerHotkey"
      aria-label="Hotkey input"
      @focus="onFocus"
      @blur="onBlur"
      @keydown="onKeydown"
      @keyup="onKeyUp"
      @input="onInput"
    />
    <ark.span class="sr-only">
      {{ innerHotkey }}
    </ark.span>
  </ark.div>
</template>
