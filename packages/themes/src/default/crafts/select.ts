import type { VariantProps } from '../../utils'
import { tv } from '../../utils'

const prefix = 'rui-select'

export const tvSelect = tv(
  {
    slots: {
      root: '',
      trigger: [
        'group',
        'flex',
        'items-center',
        'min-w-[10.875rem]',
        'rounded',
        'gap-1.5',
        'px-2',
        'py-1.5',
        'text-start',
        'transition-colors',
        'data-[disabled]:pointer-events-none',
        'data-[disabled]:opacity-(--disabled-opacity)',
      ],
      indicator: ['data-[state=open]:rotate-180', 'transition-transform'],
      value: 'flex-1 flex items-center [&>span]:truncate',
      content: [
        'relative',
        'z-auto',
        'min-w-(--reference-width)',
        'rounded',
        'p-0',
        'z-(--z-popover)',
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
      contentInner: '',
      item: [
        'w-full',
        'relative',
        'flex',
        'items-center',
        'justify-between',
        'gap-2',
        'rounded',
        'cursor-default',
        'select-none',
        'data-[disabled]:pointer-events-none',
        'data-[disabled]:opacity-(--disabled-opacity)',
      ],
      itemIndicator: '[&_path]:animate-check-dash',
      itemGroup: '',
      itemGroupLabel: 'relative border-b',
      clearTrigger: ['flex', 'items-center', 'justify-center'],
    },
    variants: {
      size: {
        xs: {
          trigger: 'text-xs',
          item: 'text-xs px-1.5 py-1',
          contentInner: 'px-1.5 py-1',
          itemGroupLabel: 'text-sm px-1.5 py-1.5 mb-1.5',
        },
        sm: {
          trigger: 'text-sm',
          item: 'text-sm px-2 py-1.5',
          contentInner: 'px-2 py-1.5',
          itemGroupLabel: 'text-base px-2 py-2 mb-2',
        },
        base: {
          trigger: 'text-base',
          item: 'text-base px-2.5 py-1.5',
          contentInner: 'px-2.5 py-1.5',
          itemGroupLabel: 'text-xl px-2.5 py-2.5 mb-2.5',
        },
        lg: {
          trigger: 'text-lg',
          item: 'text-lg px-3 py-2',
          contentInner: 'px-3 py-2',
          itemGroupLabel: 'text-xl px-3 py-3 mb-3',
        },
      },
      bordered: {
        true: {
          trigger: 'border',
          content: 'border',
        },
        false: '',
      },
    },
    defaultVariants: {
      size: 'base',
      bordered: true,
    },
  },
  {
    slots: {
      root: prefix,
      trigger: `${prefix}-trigger`,
      indicator: `${prefix}-indicator`,
      content: `${prefix}-content`,
      contentInner: `${prefix}-content-inner`,
      value: `${prefix}-value`,
      item: `${prefix}-item`,
      itemIndicator: `${prefix}-item-indicator`,
      itemGroup: `${prefix}-item-group`,
      itemGroupLabel: `${prefix}-item-group-label`,
      clearTrigger: `${prefix}-clear-trigger`,
    },
  },
)

export type SelectVariants = VariantProps<typeof tvSelect>
