import { Icon } from '../../icon'
import { Input } from '../index'

export function InputPrefixSuffixAndUiExample() {
  return (
    <div className="w-full flex flex-col gap-3">
      <Input
        className="w-70"
        placeholder="Search..."
        prefix={<Icon icon="lucide:search" className="text-gray-cc" />}
        suffix={<Icon icon="lucide:corner-down-left" className="text-gray-55" />}
        ui={{ root: 'border-rz-green', input: 'text-gray-ff' }}
      />
      <Input
        className="w-70"
        placeholder="Clearable with custom clear icon size"
        clearable
        prefix={<Icon icon="lucide:mail" className="text-gray-cc" />}
        ui={{ clearable: 'text-rz-green' }}
      />
    </div>
  )
}
