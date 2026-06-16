import type { VariantProps } from '../../utils'
import { mapVariant, tv } from '../../utils'
/**
 * @color razer/components/checkbox.css
 */
export const tvCheckbox = tv(
  {
    slots: {
      root: ['flex', 'items-center', 'gap-2.5', 'w-fit', 'relative'],
      control: ['peer', 'shrink-0', 'size-[0.875lh]', 'rounded-xs', 'border'],
      indicator: ['flex', 'h-full', 'w-full', 'items-center', 'justify-center', 'text-inherit'],
      indicatorChecked: [
        'size-[87.5%]',
        'stroke-black',
        'stroke-[.125rem]',
        '[&>path]:animate-check-dash',
      ],
      indicatorMinus: [
        'size-[87.5%]',
        'stroke-black',
        'stroke-[.125rem]',
        '[&_path]:animate-indeterminate-dash',
      ],
      label: '',
    },
    variants: {
      disabled: {
        true: '',
        false: '',
      },
      size: {
        xs: {
          root: 'text-xs',
        },
        sm: {
          root: 'text-sm',
        },
        base: {
          root: 'text-base',
        },
        lg: {
          root: 'text-lg',
        },
      },
    },
    defaultVariants: {
      size: 'base',
    },
  },
  'rui-checkbox',
)

export type CheckboxVariants = VariantProps<typeof tvCheckbox>
