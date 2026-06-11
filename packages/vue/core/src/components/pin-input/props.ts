import type { PinInputRootBaseProps } from '@ark-ui/vue/pin-input'
import type { PinInputVariants } from '@raxium/themes/default'
import type { ThemeCrafts } from '@raxium/vue/providers'
import type { HTMLAttributes } from 'vue'

export interface PinInputProps extends PinInputRootBaseProps, ThemeCrafts<'tvPinInput'> {
  class?: HTMLAttributes['class']
  /**
   * Number of input cells to render
   * @default 4
   */
  count?: number
  /**
   * The size variant
   */
  size?: PinInputVariants['size']
  /**
   * Whether to show a separator between inputs
   */
  separator?: string
  ui?: {
    root?: HTMLAttributes['class']
    label?: HTMLAttributes['class']
    control?: HTMLAttributes['class']
    input?: HTMLAttributes['class']
    separator?: HTMLAttributes['class']
  }
}
