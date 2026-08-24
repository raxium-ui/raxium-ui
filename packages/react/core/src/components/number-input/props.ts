import type { NumberInputRootBaseProps } from '@ark-ui/react/number-input'
import type { ThemeCrafts } from '@raxium/react/providers/theme'
import type { FocusEvent, HTMLAttributes, ReactNode } from 'react'

type ClassName = HTMLAttributes<HTMLElement>['className']

export interface NumberInputProps extends NumberInputRootBaseProps, ThemeCrafts<'tvNumberInput'> {
  className?: ClassName
  showTrigger?: boolean
  prefix?: ReactNode
  suffix?: ReactNode
  ui?: {
    root?: ClassName
    control?: ClassName
    input?: ClassName
    triggerGroup?: ClassName
    trigger?: ClassName
  }
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void
}
