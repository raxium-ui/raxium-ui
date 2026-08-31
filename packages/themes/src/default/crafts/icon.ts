import type { VariantProps } from '../../utils/tv'
import { tv } from '../../utils/tv'

export const tvIcon = tv(
  {
    base: 'size-[1lh]',
  },
  'rui-icon',
)

export type IconVariants = VariantProps<typeof tvIcon>
