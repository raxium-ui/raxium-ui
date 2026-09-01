import type { CheckboxValueType } from '../props'
import { CheckboxGroup } from '../index'

function acceptCheckboxGroup<T extends CheckboxValueType>(
  _props: Parameters<typeof CheckboxGroup<T>>[0],
) {}

acceptCheckboxGroup({
  value: ['a'],
  onValueChange: (next: string[]) => {
    void next
  },
})

acceptCheckboxGroup({
  value: [1],
  onValueChange: (next: number[]) => {
    void next
  },
})
