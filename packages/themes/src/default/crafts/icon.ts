import type { VariantProps } from '../../utils'
import { tv } from '../../utils'

export const tvIcon = tv(
  {
    base: 'size-[1lh]',
  },
  'rui-icon',
)

export type IconVariants = VariantProps<typeof tvIcon>
