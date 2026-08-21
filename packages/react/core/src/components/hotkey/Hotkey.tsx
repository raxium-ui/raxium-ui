import type { HotkeyProps } from './props'
import { ark } from '@ark-ui/react/factory'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useTheme } from '@raxium/react/hooks/useTheme'
import { composeRefs } from '@raxium/react/utils/compose-refs'
import { cxc } from '@raxium/themes/utils'
import { isEmpty, without } from 'es-toolkit/compat'
import { forwardRef, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { CodesMap, isAccebilityCode, isAssistCode, isDeleteCode, isMainCode } from './keycode'

type InputState = 'disabled' | 'readonly' | 'focused' | 'blur'

function placeholderText(
  placeholder: HotkeyProps['placeholder'],
  focused: boolean,
  empty: boolean,
): string {
  const custom = typeof placeholder === 'function' ? placeholder(focused) : (placeholder ?? '')
  if (!empty)
    return custom
  return custom || (focused ? 'Press hotkey' : 'No hotkey assigned')
}

export const Hotkey = forwardRef<HTMLInputElement, HotkeyProps>(
  (
    {
      className,
      theme: propsTheme,
      craft,
      hotkey: hotkeyProp,
      defaultHotkey = '',
      placeholder: propsPlaceholder = '',
      disabled,
      readOnly,
      ui,
      onHotkeyChange,
      onFocus,
      onBlur,
      onError,
      onCancel,
      onChange,
    },
    ref,
  ) => {
    const theme = useTheme(propsTheme)
    const crafts = useCraft(theme, 'tvHotkey', undefined, craft)
    const inputRef = useRef<HTMLInputElement>(null)
    const [focused, setFocused] = useState(false)
    const focusedRef = useRef(false)
    const [display, setDisplay] = useState(hotkeyProp ?? defaultHotkey)
    const committedRef = useRef(hotkeyProp ?? defaultHotkey)
    const imeLockedRef = useRef(false)
    const keydownRecordRef = useRef({ mainCode: '', assistCodes: [] as string[] })
    const judgeKeyArrRef = useRef<string[]>([])
    const resultCodeArrRef = useRef<string[]>([])
    const keyupSetRef = useRef(new Set<string>())

    const inputState: InputState = disabled
      ? 'disabled'
      : readOnly
        ? 'readonly'
        : focused
          ? 'focused'
          : 'blur'
    const placeholder = placeholderText(propsPlaceholder, focused, isEmpty(display))

    useEffect(() => {
      if (hotkeyProp === undefined)
        return
      committedRef.current = hotkeyProp
      if (!focusedRef.current)
        setDisplay(hotkeyProp)
    }, [hotkeyProp])

    function resetData() {
      keydownRecordRef.current = { mainCode: '', assistCodes: [] }
      keyupSetRef.current.clear()
      judgeKeyArrRef.current = []
      resultCodeArrRef.current = []
    }

    function restoreDisplay(next?: string) {
      const value = next ?? committedRef.current
      setDisplay(value)
    }

    function emitHotkey(next: string) {
      committedRef.current = next
      setDisplay(next)
      onHotkeyChange?.(next)
    }

    function moveSelectionArchor() {
      const el = inputRef.current
      if (!el)
        return
      try {
        const len = el.value?.length ?? 0
        el.focus()
        el.setSelectionRange(len, len)
      }
      catch {
        /* readonly / disabled */
      }
    }

    useLayoutEffect(() => {
      if (focused)
        moveSelectionArchor()
    }, [display, focused])

    function tryCommit() {
      if (judgeKeyArrRef.current.length !== 0 || !focusedRef.current)
        return

      if (imeLockedRef.current) {
        imeLockedRef.current = false
        restoreDisplay()
        inputRef.current?.blur()
        onError?.(new Error('IME is active, please close it before inputing'))
        return
      }

      const record = keydownRecordRef.current
      if (!record.mainCode) {
        let keyupMainCode: string | null = null
        keyupSetRef.current.forEach((c) => {
          if (isMainCode(c))
            keyupMainCode = c
        })
        if (!keyupMainCode) {
          restoreDisplay()
          resetData()
          return
        }
        record.mainCode = keyupMainCode
      }

      if (isEmpty(record.assistCodes)) {
        resultCodeArrRef.current = record.assistCodes = ['ControlLeft', 'ShiftLeft']
      }
      else {
        const ordered: string[] = []
        if (record.assistCodes.includes('ControlLeft') || record.assistCodes.includes('ControlRight'))
          ordered.push('ControlLeft')
        if (record.assistCodes.includes('AltLeft') || record.assistCodes.includes('AltRight'))
          ordered.push('AltLeft')
        if (record.assistCodes.includes('ShiftLeft') || record.assistCodes.includes('ShiftRight'))
          ordered.push('ShiftLeft')
        resultCodeArrRef.current = ordered.concat(
          without(
            record.assistCodes,
            'ControlLeft',
            'ControlRight',
            'AltLeft',
            'AltRight',
            'ShiftLeft',
            'ShiftRight',
          ),
        )
      }
      resultCodeArrRef.current.push(record.mainCode)
      const next = resultCodeArrRef.current.map(c => CodesMap[c].name).join(' + ')
      emitHotkey(next)
      onChange?.(resultCodeArrRef.current, next)
      inputRef.current?.blur()
      resetData()
    }

    return (
      <ark.div
        className={crafts.root(cxc(ui?.root, className))}
        data-placeholder={placeholder}
        data-state={inputState}
      >
        <ark.input
          ref={composeRefs(ref, inputRef)}
          className={crafts.input(cxc(ui?.input))}
          disabled={disabled ? true : undefined}
          spellCheck={false}
          data-state={inputState}
          readOnly={readOnly ? true : undefined}
          placeholder={placeholder}
          value={display}
          aria-label="Hotkey input"
          onFocus={(event) => {
            focusedRef.current = true
            setFocused(true)
            onFocus?.(event)
          }}
          onBlur={(event) => {
            focusedRef.current = false
            setFocused(false)
            restoreDisplay()
            resetData()
            onBlur?.(event)
          }}
          onKeyDown={(event) => {
            const { keyCode, code, repeat } = event
            event.preventDefault()
            event.stopPropagation()
            if (!repeat && (isDeleteCode(code) || isAccebilityCode(code)))
              return
            if (repeat)
              return
            if (keyCode >= 229)
              return
            const record = keydownRecordRef.current
            if (record.mainCode === code)
              return
            if (record.assistCodes.includes(code))
              return
            if (isMainCode(code))
              record.mainCode = code
            else if (isAssistCode(code))
              record.assistCodes.push(code)

            judgeKeyArrRef.current = [...judgeKeyArrRef.current, code]

            const assistStr = record.assistCodes.reduce((acc, c) => {
              return acc === '' ? CodesMap[c].name : `${acc} + ${CodesMap[c].name}`
            }, '')
            setDisplay(
              record.mainCode
                ? (isEmpty(assistStr)
                    ? CodesMap[record.mainCode].name
                    : `${assistStr} + ${CodesMap[record.mainCode].name}`)
                : assistStr,
            )
          }}
          onKeyUp={(event) => {
            const { code } = event
            event.preventDefault()
            event.stopPropagation()
            if (isAccebilityCode(code)) {
              if (code === 'Escape')
                inputRef.current?.blur()
              return
            }
            if (isDeleteCode(code)) {
              if (display) {
                emitHotkey('')
                resetData()
                onCancel?.([], 'ESC')
                onChange?.([], 'ESC')
              }
              return
            }

            keyupSetRef.current.add(code)
            const idx = judgeKeyArrRef.current.indexOf(code)
            if (idx !== -1)
              judgeKeyArrRef.current.splice(idx, 1)
            tryCommit()
          }}
          onInput={() => {
            imeLockedRef.current = true
            restoreDisplay()
            tryCommit()
          }}
        />
        <ark.span className="sr-only">{display}</ark.span>
      </ark.div>
    )
  },
)

Hotkey.displayName = 'Hotkey'
