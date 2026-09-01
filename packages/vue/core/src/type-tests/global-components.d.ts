import type { CheckboxGroup } from '../components/checkbox'
import type { RadioGroup } from '../components/radio-group'
import type { Select } from '../components/select'
import type { Tree } from '../components/tree'

declare module 'vue' {
  export interface GlobalComponents {
    RCheckboxGroup: typeof CheckboxGroup
    RRadioGroup: typeof RadioGroup
    RSelect: typeof Select
    RTree: typeof Tree
  }
}

export {}
