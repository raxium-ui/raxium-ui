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
      scrollArea: '',
      scrollAreaContent: '',
      input: ['focus:outline-none', 'bg-transparent'],
      item: '',
      itemPreview: 'flex items-center gap-1 rounded-full cursor-default',
      itemInput: 'p-0 w-fit min-w-0 outline-none',
      itemText: '',
    },

    variants: {
      size: {
        xs: {
          input: 'text-xs',
          itemPreview: 'text-xs px-1.5',
          itemInput: 'text-xs px-0.5',
        },
        sm: {
          input: 'text-sm',
          itemPreview: 'text-sm px-2',
          itemInput: 'text-sm px-1',
        },
        base: {
          input: 'text-base',
          itemPreview: 'text-base px-2.5',
          itemInput: 'text-base px-1.5',
        },
        lg: {
          input: 'text-lg',
          itemPreview: 'text-lg px-2.5',
          itemInput: 'text-lg px-1.5',
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
    defaultVariants: {
      size: 'base',
      inline: true,
    },
  }, 'rui-tags-input',
)

export type TagsInputVariants = VariantProps<typeof tvTagsInput>
