import type { EditableInputProps } from './props'
import { Editable as ArkEditable, useEditableContext } from '@ark-ui/react/editable'
import { ark } from '@ark-ui/react/factory'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useInheritedTheme } from '@raxium/react/hooks/useInheritedTheme'
import { useComposedRefs } from '@raxium/react/utils'
import { cxc } from '@raxium/themes/utils'
import { CircleX } from 'lucide-react'
import { forwardRef, useRef, useState } from 'react'

export const EditableInput = forwardRef<HTMLInputElement, EditableInputProps>(
  ({ className, theme: propsTheme, clearable, onFocus, onBlur, ...props }, forwardedRef) => {
    const context = useEditableContext()
    const inputRef = useRef<HTMLInputElement>(null)
    const ref = useComposedRefs(forwardedRef, inputRef)
    const [focused, setFocused] = useState(false)
    const theme = useInheritedTheme(propsTheme)
    const crafts = useCraft(theme, 'tvEditableInput')
    const showClear = Boolean(clearable) && context.editing && !context.empty
    const dataState = focused ? 'focused' : 'idle'

    function onClear() {
      context.clearValue()
      setTimeout(() => {
        inputRef.current?.focus()
        setFocused(true)
      })
    }

    return (
      <ark.div
        className={crafts.root(cxc(!context.editing && 'hidden', className))}
        data-scope="editable"
        data-part="input-area"
        data-state={dataState}
      >
        <ArkEditable.Input
          ref={ref}
          className={crafts.input()}
          data-state={dataState}
          {...props}
          onFocus={(event) => {
            setFocused(true)
            onFocus?.(event)
          }}
          onBlur={(event) => {
            setFocused(false)
            onBlur?.(event)
          }}
        />
        {showClear && (
          clearable === true
            ? (
                <CircleX
                  data-scope="editable"
                  data-part="clear-button"
                  className={crafts.clearable()}
                  onPointerDown={(event) => {
                    event.stopPropagation()
                    onClear()
                  }}
                />
              )
            : (
                <span
                  data-scope="editable"
                  data-part="clear-button"
                  className={crafts.clearable()}
                  onPointerDown={(event) => {
                    event.stopPropagation()
                    onClear()
                  }}
                >
                  {clearable}
                </span>
              )
        )}
      </ark.div>
    )
  },
)

EditableInput.displayName = 'Editable.Input'
