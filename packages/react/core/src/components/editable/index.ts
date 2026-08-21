import {
  EditableCancelTrigger,
  EditableControl,
  EditableEditTrigger,
  EditableSubmitTrigger,
  useEditableContext,
} from '@ark-ui/react/editable'
import { EditableRoot } from './Editable'
import { EditableInput } from './EditableInput'
import { EditablePreview } from './EditablePreview'

export const Editable = Object.assign(EditableRoot, {
  Input: EditableInput,
  Preview: EditablePreview,
  Control: EditableControl,
  EditTrigger: EditableEditTrigger,
  SubmitTrigger: EditableSubmitTrigger,
  CancelTrigger: EditableCancelTrigger,
})

export {
  EditableCancelTrigger,
  EditableControl,
  EditableEditTrigger,
  EditableInput,
  EditablePreview,
  EditableSubmitTrigger,
  useEditableContext,
}

export type {
  EditableInputProps,
  EditablePreviewProps,
  EditableProps,
} from './props'
