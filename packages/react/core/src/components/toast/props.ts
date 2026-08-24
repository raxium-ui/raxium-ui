import type {
  CreateToasterProps,
  CreateToasterReturn,
  ToastPlacement,
  ToastPromiseOptions,
  ToastRootBaseProps,
  ToastStoreProps,
  ToastType,
} from '@ark-ui/react/toast'
import type { ThemeCrafts, ThemeNoCrafts } from '@raxium/react/providers/theme'
import type { HTMLAttributes, ReactNode } from 'react'

type ClassName = HTMLAttributes<HTMLElement>['className']

export const DEFAULT_TOASTER_ID = 'default-toaster'

export interface ToastOptions {
  id?: string
  title?: ReactNode
  description?: ReactNode
  type?: ToastType
  duration?: number
  placement?: ToastPlacement
  theme?: ThemeNoCrafts['theme']
  render?: () => ReactNode
}

export interface ToastProps extends ToastRootBaseProps, ThemeNoCrafts {
  options: ToastOptions
  className?: ClassName
  icon?: ReactNode
  close?: ReactNode
  ui?: {
    root?: ClassName
    content?: ClassName
    inner?: ClassName
    title?: ClassName
    description?: ClassName
    icon?: ClassName
    close?: ClassName
  }
}

export type ToastExtraProps = Omit<ToastProps, 'options'>

export interface ToasterWrap {
  toasterId?: string
  toaster: RaxiumToaster
}

export interface ToasterManagerExpose {
  toasters: ToasterWrap[]
}

export interface ToasterManagerProps {
  disableDefaultToaster?: boolean
  defaultToasterProps?: ToasterProps
  children?: ReactNode
}

export interface ToasterProps extends CreateToasterProps, ThemeCrafts<'tvToast'> {
  toasterId?: string
  children?: (toast: ToastOptions, extra?: ToastExtraProps) => ReactNode
}

export type RaxiumToaster = Omit<
  CreateToasterReturn,
  'create' | 'update' | 'error' | 'success' | 'info' | 'warning' | 'loading' | 'promise'
> & {
  create: (data: ToastOptions, extra?: ToastExtraProps) => string
  update: (id: string, data: Partial<ToastOptions>, extra?: ToastExtraProps) => string
  error: (data?: Partial<ToastOptions>, extra?: ToastExtraProps) => void
  success: (data?: Partial<ToastOptions>, extra?: ToastExtraProps) => void
  info: (data?: Partial<ToastOptions>, extra?: ToastExtraProps) => void
  warning: (data?: Partial<ToastOptions>, extra?: ToastExtraProps) => void
  loading: (data?: Partial<ToastOptions>, extra?: ToastExtraProps) => void
  promise: <T>(
    promise: Promise<T> | (() => Promise<T>),
    options: ToastPromiseOptions<T, ReactNode>,
    shared?: Omit<ToastOptions, 'type'>,
    extra?: ToastExtraProps,
  ) => ReturnType<CreateToasterReturn['promise']>
}

export type { ToastStoreProps }
