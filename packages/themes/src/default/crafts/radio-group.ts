import type { VariantProps } from '../../utils'
import { mapVariant, tv } from '../../utils'

const prefix = 'rui-radio-group'

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
      ],
      itemIndicator: '',
      itemText: '',
    },
    variants: {
      size: {
        xs: {
          itemControl: 'size-3',
          itemIndicator: 'size-1.5',
          itemText: 'text-xs',
        },
        sm: {
          itemControl: 'size-3.5',
          itemIndicator: 'size-1.75',
          itemText: 'text-sm',
        },
        base: {
          itemControl: 'size-4',
          itemIndicator: 'size-2',
          itemText: 'text-base',
        },
        lg: {
          itemControl: 'size-4.5',
          itemIndicator: 'size-2.25',
          itemText: 'text-lg',
        },
      },
      variant: {
        default: {
          itemIndicator: 'motion-scale-in-0',
        },
        checkbox: {
          itemIndicator: 'stroke-[.125rem] [&>path]:animate-check-dash',
        },
      },
    },
    compoundVariants: [
      ...mapVariant('size', {
        xs: { itemIndicator: 'size-2' },
        sm: { itemIndicator: 'size-2.5' },
        base: { itemIndicator: 'size-3' },
        lg: { itemIndicator: 'size-3.5' },
      }).map(v => ({ ...v, variant: 'checkbox' as const })),
    ],
    defaultVariants: {
      size: 'base',
    },
  },
  {
    slots: {
      root: prefix,
      item: `${prefix}-item`,
      itemControl: `${prefix}-item-control`,
      itemIndicator: `${prefix}-item-indicator`,
      itemText: `${prefix}-item-text`,
    },
  },
)

export type RadioGroupVariants = VariantProps<typeof tvRadioGroup>
