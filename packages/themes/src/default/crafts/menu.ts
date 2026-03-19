import type { VariantProps } from '../../utils'
import { tv } from '../../utils'

const prefix = 'rui-menu'

export const tvMenu = tv(
  {
    slots: {
      root: '',
      content: [
        'rounded-(--border-radius)',
        'data-[state=open]:motion-opacity-in',
        'data-[state=open]:motion-scale-in-95',
        'data-[state=open]:data-[placement^=bottom]:motion-translate-y-in-[.25rem]',
        'data-[state=open]:data-[placement^=top]:-motion-translate-y-in-[.25rem]',
        'data-[state=open]:data-[placement^=left]:-motion-translate-x-in-[.25rem]',
        'data-[state=open]:data-[placement^=right]:motion-translate-x-in-[.25rem]',
        'data-[state=closed]:motion-opacity-out',
        'data-[state=closed]:motion-scale-out-95',
        'data-[state=closed]:data-[placement^=bottom]:motion-translate-y-out-[.25rem]',
        'data-[state=closed]:data-[placement^=top]:-motion-translate-y-out-[.25rem]',
        'data-[state=closed]:data-[placement^=left]:-motion-translate-x-out-[.25rem]',
        'data-[state=closed]:data-[placement^=right]:motion-translate-x-out-[.25rem]',
      ],
      contentInner: [
        'relative',
        'rounded-(--border-radius)',
        'z-10',
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
  {
    slots: {
      root: prefix,
      content: `${prefix}-content`,
      contentInner: `${prefix}-content-inner`,
      item: `${prefix}-item`,
      itemGroup: `${prefix}-item-group`,
      itemGroupLabel: `${prefix}-item-group-label`,
      triggerItem: `${prefix}-trigger-item`,
      triggerItemIndicator: `${prefix}-trigger-item-indicator`,
      radioItem: `${prefix}-radio-item`,
    },
  },
)
export type MenuVariants = VariantProps<typeof tvMenu>
