import type {
  DialogBackdropProps as ArkDialogBackdropProps,
  DialogCloseTriggerProps as ArkDialogCloseTriggerProps,
  DialogRootBaseProps,
  DialogTriggerProps as ArkDialogTriggerProps,
} from '@ark-ui/react/dialog'
import type { ThemeCrafts, ThemeNoCrafts } from '@raxium/react/providers/theme'
import type { ComponentProps, HTMLAttributes, MouseEvent, ReactNode } from 'react'
import type { Button } from '../button'
import type { DialogTriggerFrom } from './dialog-intercept-context'

type ClassName = HTMLAttributes<HTMLElement>['className']

export type DialogOpenChangeDetails = { open: boolean, from: DialogTriggerFrom }

/** 关闭前钩子：调用 `done()` 后才会完成关闭；调用 `resume()` 可取消本次拦截并允许再次触发 beforeClose */
export type DialogBeforeCloseHandler = ({
  from,
  done,
  resume,
}: {
  from: DialogTriggerFrom
  /** `autoClose === false` 时等价于 `resume()` */
  done: (autoClose?: boolean) => void
  /** 取消本次关闭拦截，Dialog 保持打开，之后可再次进入 beforeClose */
  resume: () => void
}) => void

export interface DialogProps extends Omit<DialogRootBaseProps, 'onOpenChange'>, ThemeCrafts<'tvDialog'> {
  className?: ClassName
  children?: ReactNode
  beforeClose?: DialogBeforeCloseHandler
  onOpenChange?: (details: DialogOpenChangeDetails) => void
}

export interface DialogBackdropProps extends ArkDialogBackdropProps, ThemeNoCrafts {
  className?: ClassName
  children?: ReactNode
}

export interface DialogBodyProps extends ThemeNoCrafts {
  className?: ClassName
  asChild?: boolean
  children?: ReactNode
}

export interface DialogCloseTriggerProps extends ArkDialogCloseTriggerProps {
  from?: DialogTriggerFrom
  children?: ReactNode
}

export interface DialogContentProps extends ThemeNoCrafts {
  className?: ClassName
  ui?: {
    backdrop?: ClassName
    positioner?: ClassName
    content?: ClassName
    close?: ClassName
  }
  showClose?: boolean
  /** Replaces the default content-close control (Vue `#close`). */
  close?: ReactNode
  children?: ReactNode
}

export interface DialogFooterProps extends ThemeNoCrafts {
  className?: ClassName
  ui?: {
    root?: ClassName
    cancel?: ClassName
    ok?: ClassName
  }
  widget?: {
    cancel?: ComponentProps<typeof Button> & { text?: string }
    ok?: ComponentProps<typeof Button> & { text?: string }
  }
  onOk?: (event: MouseEvent<HTMLButtonElement>) => void
  onCancel?: (event: MouseEvent<HTMLButtonElement>) => void
  children?: ReactNode
}

export interface DialogHeaderProps extends ThemeNoCrafts {
  className?: ClassName
  ui?: {
    root?: ClassName
    title?: ClassName
    close?: ClassName
  }
  children?: ReactNode
}

export interface DialogTriggerProps extends ArkDialogTriggerProps {
  from?: DialogTriggerFrom
  children?: ReactNode
}
