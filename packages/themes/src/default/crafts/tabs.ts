import type { VariantProps } from '../../utils'
import { tv } from '../../utils'

const prefix = 'rui-tabs'

export const tvTabs = tv({
  slots: {
    root: '',
    list: ['flex', 'items-center', 'relative', 'overflow-hidden'],
    trigger: [
      'inline-flex',
      'items-center',
      'justify-center',
      'whitespace-nowrap',
      'rounded',
      'transition-all',
      'outline-offset-[-2px]',
      'disabled:pointer-events-none',
      'disabled:opacity-(--disabled-opacity)',
    ],
    content: ['mt-2'],
    indicator: [],
  },

  variants: {
    size: {
      xs: {
        trigger: 'text-xs',
      },
      sm: {
        trigger: 'text-sm',
      },
      base: {
        trigger: 'text-base',
      },
      lg: {
        trigger: 'text-lg',
      },
    },
    orientation: {
      horizontal: {
        indicator: 'w-(--width) bottom-0',
      },
      vertical: {
        indicator: 'h-(--height)',
      },
    },
    prev: {
      true: '',
      false: '',
    },
    next: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    // horizontal
    {
      orientation: 'horizontal',
      size: 'xs',
      class: {
        trigger: 'px-3 py-2',
        indicator: 'h-0.5',
      },
    },
    {
      orientation: 'horizontal',
      size: 'sm',
      class: {
        trigger: 'px-3.5 py-2.5',
        indicator: 'h-0.75',
      },
    },
    {
      orientation: 'horizontal',
      size: 'base',
      class: {
        trigger: 'px-4 py-3',
        indicator: 'h-1',
      },
    },
    {
      orientation: 'horizontal',
      size: 'lg',
      class: {
        trigger: 'px-4.5 py-3.5',
        indicator: 'h-1.25',
      },
    },
    {
      orientation: 'horizontal',
      prev: true,
      class: {
        content: 'data-[state=open]:-motion-translate-x-in data-[state=open]:motion-opacity-in',
      },
    },
    {
      orientation: 'horizontal',
      next: true,
      class: {
        content: 'data-[state=open]:motion-translate-x-in data-[state=open]:motion-opacity-in',
      },
    },
  ],
  defaultVariants: {
    size: 'base',
    orientation: 'horizontal',
    prev: false,
    next: false,
  },
}, {
  slots: {
    root: prefix,
    list: `${prefix}-list`,
    trigger: `${prefix}-trigger`,
    content: `${prefix}-content`,
    indicator: `${prefix}-indicator`,
  },
})

export type TabsVariants = VariantProps<typeof tvTabs>
