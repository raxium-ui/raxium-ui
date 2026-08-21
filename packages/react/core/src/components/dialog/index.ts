import { useDialogContext } from '@ark-ui/react/dialog'
import { DialogRoot } from './Dialog'
import { dialog, DialogRuntimeProvider, useDialog } from './dialog-functional'
import {
  TriggerFrom,
} from './dialog-intercept-context'
import { DialogBackdrop } from './DialogBackdrop'
import { DialogBody } from './DialogBody'
import { DialogCloseTrigger } from './DialogCloseTrigger'
import { DialogContent } from './DialogContent'
import { DialogFooter } from './DialogFooter'
import { DialogHeader } from './DialogHeader'
import { DialogTrigger } from './DialogTrigger'

export const Dialog = Object.assign(DialogRoot, {
  Trigger: DialogTrigger,
  Backdrop: DialogBackdrop,
  Content: DialogContent,
  Header: DialogHeader,
  Body: DialogBody,
  Footer: DialogFooter,
  CloseTrigger: DialogCloseTrigger,
})

export {
  dialog,
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRuntimeProvider,
  DialogTrigger,
  TriggerFrom,
  useDialog,
  useDialogContext,
}

export type {
  DialogBackdropProps,
  DialogBeforeCloseHandler,
  DialogBodyProps,
  DialogCloseTriggerProps,
  DialogContentProps,
  DialogFooterProps,
  DialogHeaderProps,
  DialogOpenChangeDetails,
  DialogProps,
  DialogTriggerProps,
} from './props'
export type {
  DialogFunctionalHandle,
  DialogOptions,
} from './dialog-functional-host'
export type {
  DialogTriggerFrom,
  OpenChangeDetails,
} from './dialog-intercept-context'
