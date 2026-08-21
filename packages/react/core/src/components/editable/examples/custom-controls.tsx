import { Check, Pencil, X } from 'lucide-react'
import { Button } from '../../button'
import { Editable, useEditableContext } from '../index'

function EditableControls() {
  const { editing } = useEditableContext()

  return (
    <Editable.Control className="flex items-center gap-2">
      {!editing && (
        <Editable.EditTrigger asChild>
          <Button className="p-0 size-5" variant="text">
            <Pencil className="size-3" />
          </Button>
        </Editable.EditTrigger>
      )}
      {editing && (
        <Editable.SubmitTrigger asChild>
          <Button className="p-0 size-5">
            <Check className="size-3" />
          </Button>
        </Editable.SubmitTrigger>
      )}
      {editing && (
        <Editable.CancelTrigger asChild>
          <Button variant="text" className="p-0 size-5">
            <X className="size-3" />
          </Button>
        </Editable.CancelTrigger>
      )}
    </Editable.Control>
  )
}

export function EditableCustomControlsExample() {
  return (
    <Editable
      placeholder="Edit me"
      className="flex gap-2"
      activationMode="none"
      suffix={<EditableControls />}
    >
      <Editable.Input clearable />
      <Editable.Preview />
    </Editable>
  )
}
