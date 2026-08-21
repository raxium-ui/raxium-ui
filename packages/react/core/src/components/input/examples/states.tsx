import { Input } from '../index'

export function InputStatesExample() {
  return (
    <div className="w-full flex flex-col gap-3">
      <Input className="w-60" placeholder="Clearable" clearable />
      <Input className="w-60" placeholder="Disabled" disabled />
      <Input
        className="w-60"
        placeholder="Readonly"
        readOnly
        defaultValue="1234567890"
        maxLength={10}
      />
    </div>
  )
}
