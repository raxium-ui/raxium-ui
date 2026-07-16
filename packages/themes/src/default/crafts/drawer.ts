import type { VariantProps } from '../../utils'
import { tv } from '../../utils'
import { DIALOG_BACKDROP_MOTION } from './_shared'

/**
 * @color razer/components/drawer.css
 */
export const tvDrawer = tv(
  {
    slots: {
      backdrop: [
        'fixed',
        'inset-0',
        'z-(--rui-z-index)',
        'pointer-events-auto',
        ...DIALOG_BACKDROP_MOTION,
      ],
      positioner: [
        'fixed',
        'inset-0',
        'flex',
        'z-(--rui-z-index)',
        'pointer-events-none',
      ],
      content: [
        'pointer-events-auto',
        'relative',
        'flex',
        'flex-col',
        'max-h-full',
        'max-w-full',
        'border',
        'outline-none',
        'data-[state=open]:motion-opacity-in',
        'data-[state=closed]:motion-opacity-out',
      ],
      grabber: ['flex', 'items-center', 'justify-center', 'shrink-0', 'touch-none'],
      grabberIndicator: ['rounded-full'],
      close: '[&_svg]:size-[1lh]',
      header: ['flex', 'items-center', 'justify-between', 'shrink-0'],
      title: '',
      description: '',
      body: ['flex-1', 'overflow-y-auto', 'min-h-0'],
      footer: ['flex', 'items-center', 'justify-end', 'shrink-0'],
    },
    variants: {
      side: {
        right: {
          positioner: 'justify-end items-stretch',
          content: [
            'h-full',
            'rounded-l',
            'border-y-0',
            'border-r-0',
            'data-[state=open]:motion-translate-x-in-[100%]',
            'data-[state=closed]:motion-translate-x-out-[100%]',
          ],
        },
        left: {
          positioner: 'justify-start items-stretch',
          content: [
            'h-full',
            'rounded-r',
            'border-y-0',
            'border-l-0',
            'data-[state=open]:-motion-translate-x-in-[100%]',
            'data-[state=closed]:-motion-translate-x-out-[100%]',
          ],
        },
        top: {
          positioner: 'justify-stretch items-start',
          content: [
            'w-full',
            'rounded-b',
            'border-x-0',
            'border-t-0',
            'data-[state=open]:-motion-translate-y-in-[100%]',
            'data-[state=closed]:-motion-translate-y-out-[100%]',
          ],
          grabber: 'py-2',
        },
        bottom: {
          positioner: 'justify-stretch items-end',
          content: [
            'w-full',
            'rounded-t',
            'border-x-0',
            'border-b-0',
            'data-[state=open]:motion-translate-y-in-[100%]',
            'data-[state=closed]:motion-translate-y-out-[100%]',
          ],
          grabber: 'py-2',
        },
      },
      size: {
        xs: {
          body: 'p-4 text-xs',
          footer: 'px-4 py-3 gap-4 text-xs',
          header: 'py-2 px-4 text-xs',
          close: 'p-0.25 text-xs',
          grabberIndicator: 'h-1 w-10',
        },
        sm: {
          body: 'p-5 text-sm',
          footer: 'px-5 py-4 gap-5 text-sm',
          header: 'py-2.5 px-5 text-sm',
          close: 'p-0.5 text-sm',
          grabberIndicator: 'h-1 w-12',
        },
        base: {
          body: 'p-6 text-base',
          footer: 'px-6 py-5 gap-6 text-base',
          header: 'py-3 px-6 text-base',
          close: 'p-0.75 text-base',
          grabberIndicator: 'h-1.5 w-14',
        },
        lg: {
          body: 'p-8 text-lg',
          footer: 'px-8 py-6 gap-8 text-lg',
          header: 'py-4 px-8 text-lg',
          close: 'p-1 text-lg',
          grabberIndicator: 'h-1.5 w-16',
        },
      },
    },
    compoundVariants: [
      { side: 'left', size: 'xs', class: { content: 'w-72' } },
      { side: 'right', size: 'xs', class: { content: 'w-72' } },
      { side: 'left', size: 'sm', class: { content: 'w-80' } },
      { side: 'right', size: 'sm', class: { content: 'w-80' } },
      { side: 'left', size: 'base', class: { content: 'w-96' } },
      { side: 'right', size: 'base', class: { content: 'w-96' } },
      { side: 'left', size: 'lg', class: { content: 'w-[28rem]' } },
      { side: 'right', size: 'lg', class: { content: 'w-[28rem]' } },
      { side: 'top', size: 'xs', class: { content: 'h-48' } },
      { side: 'bottom', size: 'xs', class: { content: 'h-48' } },
      { side: 'top', size: 'sm', class: { content: 'h-64' } },
      { side: 'bottom', size: 'sm', class: { content: 'h-64' } },
      { side: 'top', size: 'base', class: { content: 'h-80' } },
      { side: 'bottom', size: 'base', class: { content: 'h-80' } },
      { side: 'top', size: 'lg', class: { content: 'h-96' } },
      { side: 'bottom', size: 'lg', class: { content: 'h-96' } },
    ],
    defaultVariants: {
      side: 'right',
      size: 'base',
    },
  },
  'rui-drawer',
)

export type DrawerVariants = VariantProps<typeof tvDrawer>
