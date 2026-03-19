import type { NumberInputRootBaseProps } from '@ark-ui/vue'
import type { ThemeCrafts } from '@raxium/vue/providers'
import type { HTMLAttributes } from 'vue'

export interface NumberInputProps extends NumberInputRootBaseProps, ThemeCrafts<'tvInput' | 'tvNumberInput'> {
  class?: HTMLAttributes['class']
  showTrigger?: boolean
  ui?: {
    root?: HTMLAttributes['class']
    control?: HTMLAttributes['class']
    input?: HTMLAttributes['class']
    triggerGroup?: HTMLAttributes['class']
    trigger?: HTMLAttributes['class']
  }
}
