import type { RadioGroupValueType } from '../props'
import { RadioGroup } from '../index'

function acceptRadioGroup<T extends RadioGroupValueType>(
  _props: Parameters<typeof RadioGroup<T>>[0],
) {}

acceptRadioGroup({
  value: 'a',
  onValueChange: (details: { value: string }) => {
    void details.value
  },
})

acceptRadioGroup({
  value: 1,
  onValueChange: (details: { value: number }) => {
    void details.value
  },
})
