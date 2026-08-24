import { X } from 'lucide-react'
import { TagsInput } from '../index'

const preset = ['Vue', 'React', 'Solid']

export function TagsInputStatesExample() {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full max-w-[560px] flex flex-col gap-3">
        <div className="text-sm text-gray-cc">
          Disabled
        </div>
        <div className="rounded-md border border-gray-33 p-3">
          <TagsInput defaultValue={preset} disabled>
            {preset.map((item, index) => (
              <TagsInput.Item key={`${item}-${index}`} index={index} value={item}>
                <TagsInput.ItemDeleteTrigger className="ml-1 text-gray-55">
                  <X className="size-3.5" />
                </TagsInput.ItemDeleteTrigger>
              </TagsInput.Item>
            ))}
          </TagsInput>
        </div>

        <div className="text-sm text-gray-cc">
          ReadOnly
        </div>
        <div className="rounded-md border border-gray-33 p-3">
          <TagsInput defaultValue={preset} readOnly>
            {preset.map((item, index) => (
              <TagsInput.Item key={`${item}-${index}`} index={index} value={item} />
            ))}
          </TagsInput>
        </div>

        <div className="text-sm text-gray-cc">
          Invalid（仅展示状态）
        </div>
        <div className="rounded-md border border-gray-33 p-3">
          <TagsInput defaultValue={preset} invalid>
            {preset.map((item, index) => (
              <TagsInput.Item key={`${item}-${index}`} index={index} value={item}>
                <TagsInput.ItemDeleteTrigger className="ml-1 text-gray-55 hover:text-gray-ff">
                  <X className="size-3.5" />
                </TagsInput.ItemDeleteTrigger>
              </TagsInput.Item>
            ))}
          </TagsInput>
        </div>
      </div>
    </div>
  )
}
