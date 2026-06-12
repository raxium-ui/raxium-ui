import type { VariantProps } from '../../utils'
import { tv } from '../../utils'
/**
 * @color razer/components/tags-input.css
 */
export const tvTagsInput = tv(
  {
    slots: {
      root: ['flex flex-col', 'relative'],
      control: ['flex', 'items-center'],
      scrollArea: 'h-full',
      scrollAreaContent: 'h-full flex items-center',
      input: ['focus:outline-none', 'bg-transparent'],
      item: '',
      itemPreview: 'flex items-center gap-1 rounded-full cursor-default',
      itemInput: 'p-0 w-fit min-w-0 outline-none',
      itemText: '',
    },

    variants: {
      size: {
        xs: {
          control: 'text-xs',
          itemPreview: 'px-1.5',
          itemInput: 'px-0.5',
        },
        sm: {
          control: 'text-sm',
          itemPreview: 'px-2',
          itemInput: 'px-1',
        },
        base: {
          control: 'text-base',
          itemPreview: 'px-2.5',
          itemInput: 'px-1.5',
        },
        lg: {
          control: 'text-lg',
          itemPreview: 'px-2.5',
          itemInput: 'px-1.5',
        },
      },
      inline: {
        true: {
          control: ['flex-nowrap', 'p-0', 'gap-0'],
          scrollArea: ['flex-shrink-0', 'py-1.5', 'px-2', 'max-w-[calc(100%-var(--spacing)*10)]'],
          scrollAreaContent: ['flex', 'flex-nowrap', 'gap-2'],
          input: ['flex-shrink-1', 'py-1.5', 'px-2', 'min-w-5'],
          itemText: 'whitespace-nowrap',
        },
        false: {
          control: 'flex-wrap',
        },
      },
      empty: {
        true: {
          scrollArea: 'p-0',
        },
      },
    },

    compoundVariants: [
      {
        size: 'xs',
        inline: true,
        class: {
          control: 'h-6 px-2 py-0',
          input: 'p-0 h-full',
        },
      },
      {
        size: 'sm',
        inline: true,
        class: {
          control: 'h-7 px-2 py-0',
          input: 'p-0 h-full',
        },
      },
      {
        size: 'base',
        inline: true,
        class: {
          control: 'h-8 px-2 py-0',
          input: 'p-0 h-full',
        },
      },
      {
        size: 'lg',
        inline: true,
        class: {
          control: 'h-10 px-2 py-0',
          input: 'p-0 h-full',
        },
      },
    ],
    defaultVariants: {
      size: 'base',
      inline: true,
    },
  },
  'rui-tags-input',
)

export type TagsInputVariants = VariantProps<typeof tvTagsInput>
