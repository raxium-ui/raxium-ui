import type {
  EditableInputProps as ArkEditableInputProps,
  EditablePreviewProps as ArkEditablePreviewProps,
  EditableRootBaseProps,
} from '@ark-ui/react/editable'
import type { ThemeCrafts, ThemeNoCrafts } from '@raxium/react/providers/theme'
import type { HTMLAttributes, ReactNode } from 'react'

type ClassName = HTMLAttributes<HTMLElement>['className']

export interface EditableProps extends EditableRootBaseProps, ThemeCrafts<'tvEditable'> {
  className?: ClassName
  prefix?: ReactNode
  suffix?: ReactNode
  ui?: {
    root?: ClassName
    area?: ClassName
  }
  children?: ReactNode
}

export interface EditableInputProps extends Omit<ArkEditableInputProps, 'children'>, ThemeNoCrafts {
  className?: ClassName
  /** `true` 显示默认清空图标；传入 ReactNode 替换图标。 */
  clearable?: boolean | ReactNode
}

export interface EditablePreviewProps extends ArkEditablePreviewProps, ThemeNoCrafts {
  className?: ClassName
}
