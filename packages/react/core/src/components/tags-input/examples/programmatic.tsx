import { X } from 'lucide-react'
import { Button } from '../../button'
import { TagsInput, useTagsInputContext } from '../index'

function TagsInputToolbar() {
  const api = useTagsInputContext()

  return (
    <div className="mb-2 flex flex-wrap items-center gap-2">
      <Button variant="outlined" onClick={() => api.focus()}>
        Focus
      </Button>
      <Button variant="outlined" onClick={() => api.addValue('solid')}>
        Add solid
      </Button>
      <Button variant="outlined" onClick={() => api.setValue(['vue', 'svelte'])}>
        Set [vue, svelte]
      </Button>
      <Button variant="outlined" onClick={() => api.clearValue()}>
        Clear
      </Button>
      <div className="text-sm text-gray-cc">
        value:
        {' '}
        <span className="text-gray-ff">{api.value.join(', ') || '(empty)'}</span>
      </div>
    </div>
  )
}

function TagsInputItems() {
  const { value } = useTagsInputContext()

  return value.map((item, index) => (
    <TagsInput.Item key={`${item}-${index}`} index={index} value={item}>
      <TagsInput.ItemDeleteTrigger className="ml-1 text-gray-55 hover:text-gray-ff">
        <X className="size-3.5" />
      </TagsInput.ItemDeleteTrigger>
    </TagsInput.Item>
  ))
}

export function TagsInputProgrammaticExample() {
  return (
    <div className="w-full flex flex-col gap-3">
      <div className="w-full max-w-[560px] rounded-md border border-gray-33 p-3">
        <TagsInput defaultValue={['vue', 'react']} prefix={<TagsInputToolbar />}>
          <TagsInputItems />
        </TagsInput>
      </div>
    </div>
  )
}
