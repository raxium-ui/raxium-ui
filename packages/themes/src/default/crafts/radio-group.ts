import type { VariantProps } from '../../utils'
import { tv } from '../../utils'
/**
 * @color razer/components/radio-group.css
 */
export const tvRadioGroup = tv(
  {
    slots: {
      root: ['flex', 'flex-col', 'items-start', 'gap-2'],
      layout: ['flex', 'gap-2'],
      label: '',
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
          label: 'text-xs',
          item: 'text-xs',
        },
        sm: {
          label: 'text-sm',
          item: 'text-sm',
        },
        base: {
          label: 'text-base',
          item: 'text-base',
        },
        lg: {
          label: 'text-lg',
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
      layout: {
        stack: {
          layout: 'flex-col',
        },
        inline: {
          layout: 'flex-row',
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
