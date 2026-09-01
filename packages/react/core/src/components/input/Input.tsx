import type { InputProps } from './props'
import { ark } from '@ark-ui/react/factory'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useStableId } from '@raxium/react/hooks/useStableId'
import { useTheme } from '@raxium/react/hooks/useTheme'
import { cxc } from '@raxium/themes/utils'
import { CircleX } from 'lucide-react'
import { forwardRef, useState } from 'react'

type InputState = 'disabled' | 'readonly' | 'focused' | 'blur'

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      className,
      theme: propsTheme,
      craft,
      clearable = false,
      ui,
      disabled,
      readOnly,
      placeholder,
      defaultValue,
      value: valueProp,
      maxLength,
      minLength,
      type,
      prefix,
      suffix,
      onValueChange,
      onClear,
      onChange,
      onFocus,
      onBlur,
      ...props
    },
    forwardedRef,
  ) => {
    const generatedId = useStableId('input')
    const theme = useTheme(propsTheme)
    const crafts = useCraft(theme, 'tvInput', undefined, craft)
    const isControlled = valueProp !== undefined
    const [uncontrolled, setUncontrolled] = useState(defaultValue ?? '')
    const [focused, setFocused] = useState(false)
    const value = isControlled ? (valueProp ?? '') : uncontrolled
    const inputState: InputState = disabled
      ? 'disabled'
      : readOnly
        ? 'readonly'
        : focused
          ? 'focused'
          : 'blur'
    const showClear = inputState === 'focused' && clearable && Boolean(value)

    function commit(next: string) {
      if (!isControlled)
        setUncontrolled(next)
      onValueChange?.(next)
    }

    return (
      <ark.div
        className={crafts.root(cxc(ui?.root, className))}
        data-state={inputState}
      >
        {prefix}
        <ark.input
          ref={forwardedRef}
          id={id ?? generatedId}
          className={crafts.input(cxc(ui?.input))}
          data-state={inputState}
          placeholder={placeholder}
          disabled={disabled ? true : undefined}
          readOnly={readOnly ? true : undefined}
          maxLength={maxLength}
          minLength={minLength}
          type={type}
          value={value}
          {...props}
          onChange={(event) => {
            commit(event.target.value)
            onChange?.(event)
          }}
          onFocus={(event) => {
            setFocused(true)
            onFocus?.(event)
          }}
          onBlur={(event) => {
            window.setTimeout(() => {
              onBlur?.(event)
              setFocused(false)
            })
          }}
        />
        {showClear && (
          <ark.div
            className={crafts.clearable(cxc(ui?.clearable))}
            onMouseDown={(event) => {
              event.stopPropagation()
              commit('')
              onClear?.(event, '')
            }}
          >
            <CircleX />
          </ark.div>
        )}
        {suffix}
      </ark.div>
    )
  },
)

Input.displayName = 'Input'
