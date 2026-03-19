import type { VariantProps } from '../../utils'
import { tv } from '../../utils'

const prefix = 'rui-icon'

export const tvIcon = tv(
  {
    base: 'size-[1lh]',
  },
  {
    class: prefix,
  },
)

export type IconVariants = VariantProps<typeof tvIcon>
