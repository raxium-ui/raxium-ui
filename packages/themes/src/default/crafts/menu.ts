import type { VariantProps } from '../../utils'
import { tv } from '../../utils'
import { POPOVER_CONTENT_BASE, POPOVER_CONTENT_INNER_BASE } from './_shared'
/**
 * @color razer/components/menu.css
 */
export const tvMenu = tv(
  {
    slots: {
      root: '',
      content: [...POPOVER_CONTENT_BASE],
      contentInner: [
        ...POPOVER_CONTENT_INNER_BASE,
        'min-w-(--reference-width)',
      ],
      item: [
        'relative',
        'flex',
        'items-center',
        'rounded',
        'cursor-pointer',
        'transition-colors',
        'data-[disabled]:pointer-events-none',
        'data-[disabled]:opacity-(--disabled-opacity)',
      ],
      itemGroup: '',
      itemGroupLabel: 'relative border-b',
      triggerItem: 'justify-between',
      triggerItemIndicator: [
        'transition-transform',
        'data-[state=open]:rotate-180',
        '[&_svg]:size-[0.75lh]',
      ],
      radioItem: 'justify-between',
    },
    variants: {
      size: {
        xs: '',
        sm: '',
        base: '',
        lg: '',
      },
      bordered: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      {
        size: 'xs',
        class: {
          contentInner: 'px-1.5 py-1',
          item: 'text-xs px-1.5 py-1 gap-1.5',
          itemGroupLabel: 'text-xs px-1.5 py-1.5 mb-0.5',
        },
      },
      {
        size: 'sm',
        class: {
          contentInner: 'px-2 py-1.5',
          item: 'text-sm px-2 py-1.5 gap-2',
          itemGroupLabel: 'text-sm px-2 py-2 mb-1',
        },
      },
      {
        size: 'base',
        class: {
          contentInner: 'px-2.5 py-2',
          item: 'text-base px-2.5 py-2 gap-2.5',
          itemGroupLabel: 'text-base px-2.5 py-2.5 mb-1.5',
        },
      },
      {
        size: 'lg',
        class: {
          contentInner: 'px-3 py-2.5',
          item: 'text-lg px-3 py-2.5 gap-3',
          itemGroupLabel: 'text-xl px-3 py-3 mb-2',
        },
      },
      {
        bordered: true,
        class: {
          content: 'border',
        },
      },
    ],
    defaultVariants: { size: 'base', bordered: true },
  },
  'rui-menu',
)
export type MenuVariants = VariantProps<typeof tvMenu>
