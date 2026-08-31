import type { DialogFunctionalHandle, DialogOptions } from './dialog-functional'
import type { DialogTriggerFrom, OpenChangeDetails } from './dialog-intercept-context'
import { DialogContext } from '@ark-ui/vue/dialog'
import { withCompoundParts } from '../../utils/withCompoundParts'
import { dialog, useDialog } from './dialog-functional'
import { TriggerFrom } from './dialog-intercept-context'
import DialogRoot from './Dialog.vue'
import DialogBackdrop from './DialogBackdrop.vue'
import DialogBody from './DialogBody.vue'
import DialogCloseTrigger from './DialogCloseTrigger.vue'
import DialogContent from './DialogContent.vue'
import DialogFooter from './DialogFooter.vue'
import DialogHeader from './DialogHeader.vue'
import DialogTrigger from './DialogTrigger.vue'

export const Dialog = withCompoundParts(DialogRoot, {
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
  DialogContext,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  TriggerFrom,
  useDialog,
}
export type { DialogFunctionalHandle, DialogOptions }
export type { DialogTriggerFrom, OpenChangeDetails }
export * from './props'
