import type { VariantProps } from '../../utils'
import { tv } from '../../utils'
import { COLLAPSIBLE_CONTENT_MOTION } from './_shared'

const prefix = 'rui-tree'

/**
 * @color razer/components/tree.css
 */
export const tvTree = tv(
  {
    slots: {
      root: '',
      tree: '',
    },
  },
  prefix,
)

export type TreeVariants = VariantProps<typeof tvTree>

export const tvTreeBranch = tv(
  {
    slots: {
      root: 'data-[disabled]:pointer-events-none',
      control: 'flex items-center justify-between data-[disabled]:pointer-events-none',
      title: 'flex items-center',
      text: '',
      icon: 'size-[1lh]',
      indicator: [
        'data-[state=open]:rotate-90',
        'data-[state=closed]:rotate-0',
        'transition-transform',
        '[&_svg]:size-[0.75lh]',
      ],
      content: [...COLLAPSIBLE_CONTENT_MOTION],
      indentGuide: '',
      checkbox: '',
      checkboxIndicator: '',
    },

    variants: {
      size: {
        xs: {
          control: [
            'text-xs',
            'min-h-6',
            'pl-[calc((var(--depth)-1)*var(--indent,calc(var(--spacing)*3.5)))]',
          ],
          title: 'gap-2',
        },
        sm: {
          control: [
            'text-sm',
            'min-h-7',
            'pl-[calc((var(--depth)-1)*var(--indent,calc(var(--spacing)*4)))]',
          ],
          title: 'gap-2.5',
        },
        base: {
          control: [
            'text-base',
            'min-h-8',
            'pl-[calc((var(--depth)-1)*var(--indent,calc(var(--spacing)*4.5)))]',
          ],
          title: 'gap-3',
        },
        lg: {
          control: [
            'text-lg',
            'min-h-10',
            'pl-[calc((var(--depth)-1)*var(--indent,calc(var(--spacing)*5)))]',
          ],
          title: 'gap-3.5',
        },
      },
    },
    defaultVariants: {
      size: 'base',
    },
  },
  `${prefix}-branch`,
)
export type TreeBranchVariants = VariantProps<typeof tvTreeBranch>

export const tvTreeItem = tv(
  {
    slots: {
      root: 'data-[disabled]:pointer-events-none',
      title: 'flex items-center gap-2',
      icon: 'size-[1lh]',
      text: '',
      checkbox: '',
      checkboxIndicator: '',
    },
    variants: {
      size: {
        xs: {
          title: [
            'gap-2',
            'min-h-6',
            'text-xs',
            'pl-[calc((var(--depth)-1)*var(--indent,calc(var(--spacing)*3.5)))]',
          ],
        },
        sm: {
          title: [
            'gap-2.5',
            'min-h-7',
            'text-sm',
            'pl-[calc((var(--depth)-1)*var(--indent,calc(var(--spacing)*4)))]',
          ],
        },
        base: {
          title: [
            'gap-3',
            'min-h-8',
            'text-base',
            'pl-[calc((var(--depth)-1)*var(--indent,calc(var(--spacing)*4.5)))]',
          ],
        },
        lg: {
          title: [
            'gap-3.5',
            'min-h-10',
            'text-lg',
            'pl-[calc((var(--depth)-1)*var(--indent,calc(var(--spacing)*5)))]',
          ],
        },
      },
    },
    defaultVariants: {
      size: 'base',
    },
  },
  `${prefix}-item`,
)

export type TreeItemVariants = VariantProps<typeof tvTreeItem>
