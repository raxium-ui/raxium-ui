import type { VariantProps } from '../../utils'
import { tv } from '../../utils'

const prefix = 'rui-progress'

export const tvProgress = tv(
  {
    slots: {
      root: 'w-full flex flex-col items-center',
      track: '',
      range: '',
      circle: '',
      circleTrack: '',
      circleRange: '',
    },
    variants: {
      size: {
        xs: {
          track: 'rounded-[calc(var(--spacing))]',
          range: 'rounded-[calc(var(--spacing))]',
          circle: ['[--size:calc(var(--spacing)*10.5)]', '[--thickness:calc(var(--spacing)*0.5)]'],
        },
        sm: {
          track: 'rounded-[calc(var(--spacing)*1.5)]',
          range: 'rounded-[calc(var(--spacing)*1.5)]',
          circle: ['[--size:calc(var(--spacing)*12.5)]', '[--thickness:calc(var(--spacing)*1)]'],
        },
        base: {
          track: 'rounded-[calc(var(--spacing)*2)]',
          range: 'rounded-[calc(var(--spacing)*2)]',
          circle: ['[--size:calc(var(--spacing)*14.5)]', '[--thickness:calc(var(--spacing)*1.5)]'],
        },
        lg: {
          track: 'rounded-[calc(var(--spacing)*2.5)]',
          range: 'rounded-[calc(var(--spacing)*2.5)]',
          circle: ['[--size:calc(var(--spacing)*16.5)]', '[--thickness:calc(var(--spacing)*2)]'],
        },
      },

      orientation: {
        horizontal: '',
        vertical: '',
      },
    },

    compoundVariants: [
      // horizontal
      {
        orientation: 'horizontal',
        size: 'xs',
        class: {
          track: ['w-full', 'h-1', '[--height:var(--spacing)]'],
          range: ['h-full', '[--height:calc(var(--spacing))]'],
        },
      },
      {
        orientation: 'horizontal',
        size: 'sm',
        class: {
          track: ['w-full', 'h-1.5', '[--height:calc(var(--spacing)*1.5)]'],
          range: ['h-full', '[--height:calc(var(--spacing)*1.5)]'],
        },
      },
      {
        orientation: 'horizontal',
        size: 'base',
        class: {
          track: ['w-full', 'h-2', '[--height:calc(var(--spacing)*2)]'],
          range: ['h-full', '[--height:calc(var(--spacing)*2)]'],
        },
      },
      {
        orientation: 'horizontal',
        size: 'lg',
        class: {
          track: ['w-full', 'h-2.5', '[--height:calc(var(--spacing)*2.5)]'],
          range: ['h-full', '[--height:calc(var(--spacing)*2.5)]'],
        },
      },
      // vertical
      {
        orientation: 'vertical',
        size: 'xs',
        class: {
          track: ['h-full', 'w-1', '[--width:var(--spacing)]'],
          range: ['w-full', '[--width:calc(var(--spacing))]'],
        },
      },
      {
        orientation: 'vertical',
        size: 'sm',
        class: {
          track: ['h-full', 'w-1.5', '[--width:calc(var(--spacing)*1.5)]'],
          range: ['w-full', '[--width:calc(var(--spacing)*1.5)]'],
        },
      },
      {
        orientation: 'vertical',
        size: 'base',
        class: {
          track: ['h-full', 'w-2', '[--height:calc(var(--spacing)*2)]'],
          range: ['w-full', '[--height:calc(var(--spacing)*2)]'],
        },
      },
      {
        orientation: 'vertical',
        size: 'lg',
        class: {
          track: ['h-full', 'w-2.5', '[--height:calc(var(--spacing)*2.5)]'],
          range: ['w-full', '[--height:calc(var(--spacing)*2.5)]'],
        },
      },
    ],
    defaultVariants: {
      size: 'base',
      orientation: 'horizontal',
    },
  },
  {
    slots: {
      root: prefix,
      track: `${prefix}-track`,
      range: `${prefix}-range`,
      circle: `${prefix}-circle`,
      circleTrack: `${prefix}-circle-track`,
      circleRange: `${prefix}-circle-range`,
    },
  },
)

export type ProgressVariants = VariantProps<typeof tvProgress>
