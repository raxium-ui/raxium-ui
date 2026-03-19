import type { VariantProps } from '../../utils'
import { tv } from '../../utils'

const prefix = 'rui-dialog'

export const tvDialog = tv(
  {
    slots: {
      backdrop: [
        'fixed',
        'inset-0',
        'z-(--z-overlay)',
        'data-[state=open]:motion-opacity-in',
        'data-[state=open]:animate-backdrop-blur-in',
        'data-[state=closed]:motion-opacity-out',
        'data-[state=closed]:animate-backdrop-blur-out',
      ],
      positioner: ['fixed', 'inset-0', 'z-(--z-modal)', 'flex', 'items-center', 'justify-center'],
      content: [
        'relative',
        'max-w-full',
        'md:max-w-[80vw]',
        'border',
        'rounded',
        'data-[state=open]:motion-opacity-in',
        'data-[state=open]:motion-translate-y-in',
        'data-[state=closed]:motion-opacity-out',
        'data-[state=closed]:motion-translate-y-out',
      ],
      close: '',
      header: ['flex', 'items-center', 'justify-between'],
      title: [],
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
    },
    defaultVariants: {
      size: 'base',
    },
  },
  {
    slots: {
      backdrop: `${prefix}-backdrop`,
      positioner: `${prefix}-positioner`,
      content: `${prefix}-content`,
      header: `${prefix}-header`,
      close: `${prefix}-close`,
      title: `${prefix}-title`,
      body: `${prefix}-body`,
      footer: `${prefix}-footer`,
    },
  },
)

export type DialogVariants = VariantProps<typeof tvDialog>
