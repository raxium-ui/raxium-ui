import type { VariantProps } from '../../utils'
import { tv } from '../../utils'
/**
 * @color razer/components/floating-panel.css
 */
export const tvFloatingPanel = tv(
  {
    slots: {
      positioner: '',
      content: '',
      header: 'w-full flex items-center justify-between',
      control: 'flex items-center gap-2',
      title: '',
      trigger: 'flex items-center justify-center size-[1lh]',
      resizeVertical: 'h-full w-2',
      resizeHorizontal: 'w-full h-2',
      resizeCorner: 'size-2',
    },
    variants: {
      size: {
        xs: {
          header: 'py-2 pl-4 pr-3 text-xs',
          resizeVertical: 'w-0.5',
          resizeHorizontal: 'h-0.5',
          resizeCorner: 'size-1',
        },
        sm: {
          header: 'py-2.5 pl-5 pr-4 text-sm',
          control: '',
          resizeVertical: 'w-0.75',
          resizeHorizontal: 'h-0.75',
          resizeCorner: 'size-1.5',
        },
        base: {
          header: 'py-3 pl-6 pr-5 text-base',
          resizeVertical: 'w-1',
          resizeHorizontal: 'h-1',
          resizeCorner: 'size-2',
        },
        lg: {
          header: 'py-4 pl-8 pr-7 text-lg',
          resizeVertical: 'w-1.25',
          resizeHorizontal: 'h-1.25',
          resizeCorner: 'size-2.5',
        },
      },
    },
  },
  'rui-floating-panel',
)

export type FloatingPanelVariants = VariantProps<typeof tvFloatingPanel>
