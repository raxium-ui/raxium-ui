import type { PinInputRootBaseProps } from '@ark-ui/react/pin-input'
import type { ThemeCrafts } from '@raxium/react/providers/theme'
import type { PinInputVariants } from '@raxium/themes/default'
import type { HTMLAttributes, ReactNode } from 'react'

type ClassName = HTMLAttributes<HTMLElement>['className']

export interface PinInputProps extends PinInputRootBaseProps, ThemeCrafts<'tvPinInput'> {
  className?: ClassName
  /** Number of input cells to render. @default 4 */
  count?: number
  size?: PinInputVariants['size']
  /** Shown between cells. A node is repeated; an array is per-gap (before each cell after the first). */
  separator?: ReactNode | readonly ReactNode[]
  label?: ReactNode
  prefix?: ReactNode
  suffix?: ReactNode
  ui?: {
    root?: ClassName
    label?: ClassName
    control?: ClassName
    input?: ClassName
    separator?: ClassName
  }
}
