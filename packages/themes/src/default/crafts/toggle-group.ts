import type { VariantProps } from '../../utils'
import { tv } from '../../utils'

const prefix = 'rui-toggle-group'

export const tvToggleGroup = tv(
  {
    slots: {
      root: ['w-fit', 'inline-flex', 'items-center', 'group/toggle-group', 'border', 'rounded'],
      item: ['flex', 'items-center', 'justify-center', 'aspect-square'],
    },
    variants: {
      size: {
        xs: {
          item: 'size-6 text-xs',
        },
        sm: {
          item: 'size-7 text-sm',
        },
        base: {
          item: 'size-8 text-base',
        },
        lg: {
          item: 'size-9 text-lg',
        },
      },
      orientation: {
        horizontal: {
          root: 'flex-row',
          item: [
            '[&:not([hidden])~:not([hidden])]:border-s',
            '[&:not([hidden])~:not([hidden])]:border-e-0',
          ],
        },
        vertical: {
          root: 'flex-col',
          item: [
            '[&:not([hidden])~:not([hidden])]:border-t',
            '[&:not([hidden])~:not([hidden])]:border-b-0',
          ],
        },
      },
    },
    defaultVariants: {
      size: 'base',
      orientation: 'horizontal',
    },
  },
  {
    slots: {
      root: prefix,
      item: `${prefix}-item`,
    },
  },
)

export type ToggleGroupVariants = VariantProps<typeof tvToggleGroup>
