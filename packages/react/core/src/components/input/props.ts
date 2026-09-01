import type { ThemeCrafts } from '@raxium/react/providers/theme'
import type {
  ChangeEvent,
  FocusEvent,
  HTMLAttributes,
  InputHTMLAttributes,
  MouseEvent,
  ReactNode,
} from 'react'

type ClassName = HTMLAttributes<HTMLElement>['className']

export interface InputProps extends
  ThemeCrafts<'tvInput'>,
  Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'value' | 'defaultValue' | 'prefix' | 'className'> {
  id?: string
  value?: string
  defaultValue?: string
  className?: ClassName
  clearable?: boolean
  prefix?: ReactNode
  suffix?: ReactNode
  ui?: {
    root?: ClassName
    input?: ClassName
    clearable?: ClassName
  }
  onValueChange?: (value: string) => void
  onClear?: (event: MouseEvent<HTMLElement>, value: string) => void
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void
}
