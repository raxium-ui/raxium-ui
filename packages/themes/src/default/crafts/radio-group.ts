import type { VariantProps } from '../../utils'
import { tv } from '../../utils'
/**
 * @color razer/components/radio-group.css
 */
export const tvRadioGroup = tv(
  {
    slots: {
      root: ['flex', 'items-center'],
      item: ['relative', 'inline-flex', 'items-center', 'w-fit', 'gap-2', 'group/item'],
      itemControl: [
        'flex',
        'items-center',
        'justify-center',
        'aspect-square',
        'shrink-0',
        'rounded-full',
        'border',
        'size-[0.875lh]',
      ],
      itemIndicator: '',
      itemText: '',
    },
    variants: {
      size: {
        xs: {
          item: 'text-xs',
        },
        sm: {
          item: 'text-sm',
        },
        base: {
          item: 'text-base',
        },
        lg: {
          item: 'text-lg',
        },
      },
      variant: {
        default: {
          itemIndicator: 'size-[61.8%] motion-scale-in-0',
        },
        checkbox: {
          itemIndicator: 'size-[87.5%] stroke-[.125rem] [&>path]:animate-check-dash',
        },
      },
    },

    defaultVariants: {
      size: 'base',
    },
  },
  'rui-radio-group',
)

export type RadioGroupVariants = VariantProps<typeof tvRadioGroup>
