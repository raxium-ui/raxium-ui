import type { VariantProps } from '../../utils/tv'
import { tv } from '../../utils/tv'
import { tabsMotionVariants } from './motion'
/**
 * @color razer/components/tabs.css
 */
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
    content: ['mt-2', 'data-[state=closed]:hidden'],
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
        root: 'overflow-x-clip', // overflow-x-clip prevents horizontal scrollbar flash during tab content slide-in animation
        indicator: 'w-(--width) bottom-0',
      },
      vertical: {
        root: 'overflow-y-clip',
        indicator: 'h-(--height)',
      },
    },
    motion: tabsMotionVariants,
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
  ],
  defaultVariants: {
    size: 'base',
    orientation: 'horizontal',
    motion: 'default',
  },
}, 'rui-tabs')

export type TabsVariants = VariantProps<typeof tvTabs>
