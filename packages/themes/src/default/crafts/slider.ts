import type { VariantProps } from '../../utils'
import { tv } from '../../utils'

const prefix = 'rui-slider'

export const tvSlider = tv(
  {
    slots: {
      root: '',
      control: '',
      track: '',
      range: '',
      thumb: ['relative', 'z-10', 'rounded-full', 'data-dragging:scale-120', 'transition-transform'],
      marker: '',
      markerDot: ['absolute', 'left-1/2', '-translate-x-1/2', 'rounded-full'],
    },
    variants: {
      size: {
        xs: {
          control: 'h-[max(var(--slider-thumb-height),.5rem)]',
          track: 'h-0.5 rounded',
          range: 'rounded',
          thumb: [
            'w-[max(var(--slider-thumb-width),.5rem)]',
            'h-[max(var(--slider-thumb-height),.5rem)]',
          ],
          markerDot: 'size-1.5 -top-[calc(max(var(--slider-thumb-height),.5rem)/2+var(--spacing)*0.75)]',
        },
        sm: {
          control: 'h-[max(var(--slider-thumb-height),.75rem)]',
          track: 'h-1 rounded-md',
          range: 'rounded-md',
          thumb: [
            'w-[max(var(--slider-thumb-width),.75rem)]',
            'h-[max(var(--slider-thumb-height),.75rem)]',
          ],
          markerDot: 'size-2 -top-[calc(max(var(--slider-thumb-height),.75rem)/2+var(--spacing))]',
        },
        base: {
          control: 'h-[max(var(--slider-thumb-height),1rem)]',
          track: 'h-1.5 rounded-lg',
          range: 'rounded-lg',
          thumb: [
            'w-[max(var(--slider-thumb-width),1rem)]',
            'h-[max(var(--slider-thumb-height),1rem)]',
          ],
          markerDot: 'size-2.5 -top-[calc(max(var(--slider-thumb-height),1rem)/2+var(--spacing)*1.25)]',
        },
        lg: {
          control: 'h-[max(var(--slider-thumb-height),1.25rem)]',
          track: 'h-2 rounded-xl',
          range: 'rounded-xl',
          thumb: [
            'w-[max(var(--slider-thumb-width),1.25rem)]',
            'h-[max(var(--slider-thumb-height),1.25rem)]',
          ],
          markerDot: 'size-3 -top-[calc(max(var(--slider-thumb-height),1.25rem)/2+var(--spacing)*1.5)]',
        },
      },
      orientation: {
        horizontal: {
          root: 'flex flex-col',
          control: 'w-full flex items-center',
          track: 'w-full',
          range: 'h-full',
        },
        vertical: {
          root: 'flex items-center justify-center',
          control: 'h-full flex items-center',
          track: 'h-full',
          range: 'w-full',
        },
      },
    },
    defaultVariants: {
      size: 'base',
      orientation: 'horizontal',
    },
  },
  {
    slots: {
      root: prefix,
      control: `${prefix}-control`,
      track: `${prefix}-track`,
      range: `${prefix}-range`,
      thumb: `${prefix}-thumb`,
      marker: `${prefix}-marker`,
      markerDot: `${prefix}-marker-dot`,
    },
  },
)

export type SliderVariants = VariantProps<typeof tvSlider>
