import type { ThemeCrafts } from '@raxium/react/providers/theme'
import type { FocusEvent, HTMLAttributes } from 'react'

type ClassName = HTMLAttributes<HTMLElement>['className']

export interface HotkeyProps extends ThemeCrafts<'tvHotkey'> {
  /** Current hotkey display string. Use with `onHotkeyChange`. */
  hotkey?: string
  defaultHotkey?: string
  placeholder?: string | ((focused: boolean) => string)
  className?: ClassName
  disabled?: boolean
  readOnly?: boolean
  ui?: {
    root?: ClassName
    input?: ClassName
  }
  onHotkeyChange?: (hotkey: string) => void
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void
  onError?: (error: Error) => void
  onCancel?: (keycodes: string[], hotkey: string) => void
  onChange?: (keycodes: string[], hotkey: string) => void
}
