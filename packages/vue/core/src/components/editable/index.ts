import {
  EditableCancelTrigger,
  EditableControl,
  EditableEditTrigger,
  EditableSubmitTrigger,
} from '@ark-ui/vue/editable'
import { withCompoundParts } from '../../utils/withCompoundParts'
import EditableRoot from './Editable.vue'
import EditableInput from './EditableInput.vue'
import EditablePreview from './EditablePreview.vue'

export const Editable = withCompoundParts(EditableRoot, {
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
}
export * from './props'
