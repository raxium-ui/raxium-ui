import type { VariantProps } from '../../utils'
import { tv } from '../../utils'

const prefix = 'rui-date-picker'

export const tvDatePicker = tv(
  {
    slots: {
      root: '',
      control: ['flex', 'items-center', 'gap-2', 'w-fit'],
      content: [
        'group/content',
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
    },

    variants: {
      size: {
        xs: {
          contentInner: 'px-1.5 py-1',
        },
        sm: {
          contentInner: 'px-2 py-1.5',
        },
        base: {
          contentInner: 'px-2.5 py-1.5',
        },
        lg: {
          contentInner: 'px-3 py-2',
        },
      },
      bordered: {
        true: {
          content: 'border',
        },
        false: '',
      },
    },
  },
  {
    slots: {
      root: `${prefix}`,
      control: `${prefix}-control`,
      content: `${prefix}-content`,
      contentInner: `${prefix}-content-inner`,
    },
  },
)

export type DatePickerVariants = VariantProps<typeof tvDatePicker>

export const tvDatePickerView = tv(
  {
    slots: {
      view: 'flex flex-col gap-2',
      viewControl: ['flex', 'items-center', 'justify-between', 'w-full'],
      viewControlTrigger: '',
      viewTrigger: 'rounded',
      table: 'grid gap-2',
      tableHead: 'grid',
      tableHeader: 'block text-center truncate uppercase',
      tableBody: 'grid',
      tableCell: '',
      tableCellTrigger: [
        'relative',
        'flex',
        'items-center',
        'justify-center',
        'size-full',
        'cursor-default',
      ],
    },
    variants: {
      size: {
        xs: {
          view: 'text-xs',
          viewControl: '',
          viewControlTrigger: 'box-content p-1.5',
          viewTrigger: 'text-xs h-6 px-1.5',
          tableHeader: 'w-6 text-xxs',
        },
        sm: {
          view: 'text-sm',
          viewControl: '',
          viewControlTrigger: 'box-content p-2',
          viewTrigger: 'text-sm h-8 px-2',
          tableHeader: 'w-8 text-xs',
        },
        base: {
          view: 'text-base',
          viewControl: '',
          viewControlTrigger: 'box-content p-2.5',
          viewTrigger: 'text-base h-9.5 px-2.5',
          tableHeader: 'w-10 text-sm',
        },
        lg: {
          view: 'text-lg',
          viewControl: '',
          viewControlTrigger: 'box-content p-3',
          viewTrigger: 'text-lg h-10 px-3',
          tableHeader: 'w-12 text-base',
        },
      },

      view: {
        day: {
          tableHead: 'grid-cols-7',
          tableBody: 'grid-cols-7',
          tableCell: 'aspect-square',
        },
        month: {
          tableBody: 'grid-cols-4',
          tableCell: 'aspect-[16/9]',
        },
        year: {
          tableBody: 'grid-cols-4',
          tableCell: 'aspect-[16/9]',
        },
      },

      selected: {
        true: {
          tableCellTrigger: 'rounded',
        },
      },

      inRange: {
        true: {
          tableCellTrigger: 'rounded-none',
        },
      },
      firstInRange: {
        true: {
          tableCellTrigger: 'rounded-tl rounded-bl',
        },
      },
      firstInHoveredRange: {
        true: {
          tableCellTrigger: 'rounded-tl rounded-bl',
        },
      },
      lastInRange: {
        true: {
          tableCellTrigger: 'rounded-br rounded-tr',
        },
      },
      lastInHoveredRange: {
        true: {
          tableCellTrigger: 'rounded-br rounded-tr',
        },
      },
      today: {
        true: {
          tableCellTrigger: [
            'after:content-[""]',
            'after:absolute',
            'after:top-0',
            'after:right-0',
            'after:rounded-full',
          ],
        },
      },
    },

    compoundVariants: [
      {
        size: 'xs',
        view: ['month', 'year'],
        class: {
          tableCell: 'w-12',
        },
      },
      {
        size: 'sm',
        view: ['month', 'year'],
        class: {
          tableCell: 'w-14',
        },
      },
      {
        size: 'base',
        view: ['month', 'year'],
        class: {
          tableCell: 'w-16',
        },
      },
      {
        size: 'lg',
        view: ['month', 'year'],
        class: {
          tableCell: 'w-18',
        },
      },
      {
        today: true,
        size: 'xs',
        class: {
          tableCellTrigger: 'after:w-1.25 after:h-1.25',
        },
      },
      {
        today: true,
        size: 'sm',
        class: {
          tableCellTrigger: 'after:w-1.5 after:h-1.5',
        },
      },
      {
        today: true,
        size: 'base',
        class: {
          tableCellTrigger: 'after:w-1.75 after:h-1.75',
        },
      },
      {
        today: true,
        size: 'lg',
        class: {
          tableCellTrigger: 'after:w-2 after:h-2',
        },
      },
    ],
    defaultVariants: {
      size: 'base',
    },
  },
  {
    slots: {
      view: `${prefix}-view`,
      viewControl: `${prefix}-view-control`,
      viewTrigger: `${prefix}-view-trigger`,
      viewControlTrigger: `${prefix}-view-control-trigger`,
      table: `${prefix}-table`,
      tableHead: `${prefix}-table-head`,
      tableHeader: `${prefix}-table-header`,
      tableBody: `${prefix}-table-body`,
      tableCell: `${prefix}-table-cell`,
      tableCellTrigger: `${prefix}-table-cell-trigger`,
    },
  },
)

export type DatePickerViewVariants = VariantProps<typeof tvDatePickerView>
