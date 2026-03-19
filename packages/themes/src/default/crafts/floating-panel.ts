import type { VariantProps } from '../../utils'
import { tv } from '../../utils'

const prefix = 'rui-floating-panel'

export const tvFloatingPanel = tv(
  {
    slots: {
      positioner: '',
      content: '',
      header: 'w-full flex items-center justify-between',
      control: 'flex items-center gap-2',
      title: '',
      trigger: 'flex items-center justify-center',
      resizeVertical: 'h-full w-2',
      resizeHorizontal: 'w-full h-2',
      resizeCorner: 'size-2',
    },
    variants: {
      size: {
        xs: {
          header: 'py-2 pl-4 pr-3 text-xs',
          control: '',
          trigger: 'size-5',
          resizeVertical: 'w-0.5',
          resizeHorizontal: 'h-0.5',
          resizeCorner: 'size-1',
        },
        sm: {
          header: 'py-2.5 pl-5 pr-4 text-sm',
          control: '',
          trigger: 'size-6',
          resizeVertical: 'w-0.75',
          resizeHorizontal: 'h-0.75',
          resizeCorner: 'size-1.5',
        },
        base: {
          header: 'py-3 pl-6 pr-5 text-base',
          control: '',
          trigger: 'size-7',
          resizeVertical: 'w-1',
          resizeHorizontal: 'h-1',
          resizeCorner: 'size-2',
        },
        lg: {
          header: 'py-4 pl-8 pr-7 text-lg',
          control: '',
          trigger: 'size-8',
          resizeVertical: 'w-1.25',
          resizeHorizontal: 'h-1.25',
          resizeCorner: 'size-2.5',
        },
      },
    },
  },
  {
    slots: {
      positioner: `${prefix}-positioner`,
      content: `${prefix}-content`,
      header: `${prefix}-header`,
      control: `${prefix}-control`,
      title: `${prefix}-title`,
      trigger: `${prefix}-trigger`,
      resizeVertical: `${prefix}-resize-vertical`,
      resizeHorizontal: `${prefix}-resize-horizontal`,
      resizeCorner: `${prefix}-resize-corner`,
    },
  },
)

export type FloatingPanelVariants = VariantProps<typeof tvFloatingPanel>
