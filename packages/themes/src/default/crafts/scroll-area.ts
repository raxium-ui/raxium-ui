import type { VariantProps } from '../../utils'
import { tv } from '../../utils'
/**
 * @color razer/components/scroll-area.css
 */
export const tvScrollArea = tv({
  slots: {
    root: 'overflow-hidden',
    viewport: 'size-full scrollbar-none scrollbar-none::-webkit-scrollbar',
    content: '',
    scrollbar: '',
    thumb: 'rounded-full',
    corner: '',
  },

  variants: {
    size: {
      xs: '',
      sm: '',
      base: '',
      lg: '',
    },
    orientation: {
      vertical: {
        scrollbar: 'px-0.25',
      },
      horizontal: {
        scrollbar: 'py-0.25',
      },
    },
  },
  compoundVariants: [
    // vertical
    {
      orientation: 'vertical',
      size: 'xs',
      class: {
        scrollbar: 'w-1',
        thumb: 'w-0.5',
      },
    },
    {
      orientation: 'vertical',
      size: 'sm',
      class: {
        scrollbar: 'w-1.5',
        thumb: 'w-1',
      },
    },
    {
      orientation: 'vertical',
      size: 'base',
      class: {
        scrollbar: 'w-2',
        thumb: 'w-1.5',
      },
    },
    {
      orientation: 'vertical',
      size: 'lg',
      class: {
        scrollbar: 'w-2.5',
        thumb: 'w-2',
      },
    },
    // horizontal
    {
      orientation: 'horizontal',
      size: 'xs',
      class: {
        scrollbar: 'h-1',
        thumb: 'h-0.5',
      },
    },
    {
      orientation: 'horizontal',
      size: 'sm',
      class: {
        scrollbar: 'h-1.5',
        thumb: 'h-1',
      },
    },
    {
      orientation: 'horizontal',
      size: 'base',
      class: {
        scrollbar: 'h-2',
        thumb: 'h-1.5',
      },
    },
    {
      orientation: 'horizontal',
      size: 'lg',
      class: {
        scrollbar: 'h-2.5',
        thumb: 'h-2',
      },
    },
  ],

  defaultVariants: {
    size: 'base',
    orientation: 'vertical',
  },
}, 'rui-scroll-area')

export type ScrollAreaVariants = VariantProps<typeof tvScrollArea>
