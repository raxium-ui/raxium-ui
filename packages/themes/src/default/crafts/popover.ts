import type { VariantProps } from '../../utils'
import { tv } from '../../utils'
import { POPOVER_CONTENT_BASE, POPOVER_CONTENT_INNER_BASE } from './_shared'
/**
 * @color razer/components/popover.css
 */
export const tvPopover = tv(
  {
    slots: {
      content: [...POPOVER_CONTENT_BASE],
      contentInner: [...POPOVER_CONTENT_INNER_BASE],
      close: 'inline-flex w-fit items-center justify-center [&_svg]:size-[1lh]',
      indicator: [
        'data-[state=open]:motion-rotate-out-180',
        'data-[state=closed]:motion-rotate-in-180',
        '[&_svg]:size-[0.75lh]',
      ],
    },
    variants: {
      size: {
        xs: {
          contentInner: 'px-1.5 py-0.5 text-xs',
          close: 'p-1 text-xs',
          indicator: 'text-xs',
        },
        sm: {
          contentInner: 'px-2 py-1 text-sm',
          close: 'p-1.5 text-sm',
          indicator: 'text-sm',
        },
        base: {
          contentInner: 'px-2.5 py-1.5 text-base',
          close: 'p-2 text-base',
          indicator: 'text-base',
        },
        lg: {
          contentInner: 'px-3 py-2 text-lg',
          close: 'p-2.5 text-lg',
          indicator: 'text-lg',
        },
      },
      bordered: {
        true: {
          content: 'border',
        },
        false: {
          content: 'border-none',
        },
      },
    },
    defaultVariants: {
      size: 'base',
      bordered: true,
    },
  },
  'rui-popover',
)

export type PopoverVariants = VariantProps<typeof tvPopover>
