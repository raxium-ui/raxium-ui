import type { VariantProps } from '../../utils/tv'
import { tv } from '../../utils/tv'
import { dialogMotionVariants } from './motion'
/**
 * @color razer/components/dialog.css
 */
export const tvDialog = tv(
  {
    slots: {
      backdrop: [
        'fixed',
        'inset-0',
        'z-(--rui-z-index)',
        'pointer-events-auto', // see: https://github.com/chakra-ui/zag/issues/3203
      ],
      positioner: [
        'fixed',
        'inset-0',
        'flex',
        'items-center',
        'justify-center',
        'z-(--rui-z-index)',
      ],
      content: [
        'relative',
        'max-w-full',
        'md:max-w-[80vw]',
        'rounded',
      ],
      close: '[&_svg]:size-[1lh]',
      header: ['flex', 'items-center', 'justify-between'],
      title: '',
      body: ['flex-1', 'overflow-y-auto'],
      footer: ['flex', 'items-center', 'justify-end'],
    },
    variants: {
      size: {
        xs: {
          body: 'p-4 text-xs',
          footer: 'px-4 py-3 gap-4 text-xs',
          header: 'py-2 px-4 text-xs',
          close: [
            'p-0.25',
            'text-xs',
            'data-[variant=content-close]:pt-1.5',
            'data-[variant=content-close]:pr-1.5',
          ],
        },
        sm: {
          body: 'p-5 text-sm',
          footer: 'px-5 py-4 gap-5 text-sm',
          header: 'py-2.5 px-5 text-sm',
          close: [
            'p-0.5',
            'text-sm',
            'data-[variant=content-close]:p-0',
            'data-[variant=content-close]:pt-2',
            'data-[variant=content-close]:pr-2',
          ],
        },
        base: {
          body: 'p-6 text-base',
          footer: 'px-6 py-5 gap-6 text-base',
          header: 'py-3 px-6 text-base',
          close: [
            'p-0.75',
            'text-base',
            'data-[variant=content-close]:pt-2.5',
            'data-[variant=content-close]:pr-2.5',
          ],
        },
        lg: {
          body: 'p-8 text-lg',
          footer: 'px-8 py-6 gap-8 text-lg',
          header: 'py-4 px-8 text-lg',
          close: [
            'p-1',
            'text-lg',
            'data-[variant=content-close]:pt-3',
            'data-[variant=content-close]:pr-3',
          ],
        },
      },
      bordered: {
        true: {
          content: 'border',
        },
        false: {
          content: 'border-none',
        },
      },
      motion: dialogMotionVariants,
    },
    defaultVariants: {
      size: 'base',
      bordered: true,
      motion: 'default',
    },
  },
  'rui-dialog',
)

export type DialogVariants = VariantProps<typeof tvDialog>
