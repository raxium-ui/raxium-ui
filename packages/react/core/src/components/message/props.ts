import type { CreateToasterReturn, ToastPromiseOptions, ToastRootBaseProps, ToastType } from '@ark-ui/react/toast'
import type { ThemeCrafts, ThemeNoCrafts } from '@raxium/react/providers/theme'
import type { HTMLAttributes, ReactNode } from 'react'

type ClassName = HTMLAttributes<HTMLElement>['className']

export interface MessageOptions {
  id?: string
  title?: ReactNode
  description?: ReactNode
  type?: ToastType
  duration?: number
  theme?: ThemeNoCrafts['theme']
  render?: () => ReactNode
  showClose?: boolean
}

export interface MessageProps extends ToastRootBaseProps, ThemeNoCrafts {
  options: MessageOptions
  className?: ClassName
  icon?: ReactNode
  close?: ReactNode
  ui?: {
    root?: ClassName
    content?: ClassName
    description?: ClassName
    icon?: ClassName
    close?: ClassName
  }
}

export type MessageExtraProps = Omit<MessageProps, 'options'>

export interface MessagerExpose {
  messager: RaxiumMessager
}

export interface MessagerProps extends ThemeCrafts<'tvMessage'> {
  showClose?: boolean
  overlap?: boolean
  duration?: number
  children?: ReactNode
}

export type RaxiumMessager = Omit<
  CreateToasterReturn,
  'create' | 'update' | 'error' | 'success' | 'info' | 'warning' | 'loading' | 'promise'
> & {
  create: (data: MessageOptions, extra?: MessageExtraProps) => string
  update: (id: string, data: Partial<MessageOptions>, extra?: MessageExtraProps) => string
  error: (data?: Partial<MessageOptions>, extra?: MessageExtraProps) => void
  success: (data?: Partial<MessageOptions>, extra?: MessageExtraProps) => void
  info: (data?: Partial<MessageOptions>, extra?: MessageExtraProps) => void
  warning: (data?: Partial<MessageOptions>, extra?: MessageExtraProps) => void
  loading: (data?: Partial<MessageOptions>, extra?: MessageExtraProps) => void
  promise: <T>(
    promise: Promise<T> | (() => Promise<T>),
    options: ToastPromiseOptions<T, ReactNode>,
    shared?: Omit<MessageOptions, 'type'>,
    extra?: MessageExtraProps,
  ) => ReturnType<CreateToasterReturn['promise']>
}
