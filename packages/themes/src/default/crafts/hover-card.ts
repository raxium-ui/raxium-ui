import type { VariantProps } from '../../utils'
import { mapVariant, tv } from '../../utils'
import { POPOVER_CONTENT_BASE, POPOVER_CONTENT_INNER_BASE } from './_shared'
/**
 * @color razer/components/hover-card.css
 */
export const tvHoverCard = tv(
  {
    slots: {
      content: [...POPOVER_CONTENT_BASE],
      contentInner: [...POPOVER_CONTENT_INNER_BASE],
    },
    variants: {
      size: {
        xs: '',
        sm: '',
        base: '',
        lg: '',
      },
      bordered: {
        true: '',
        false: '',
      },
    },
    defaultVariants: {
      size: 'base',
      bordered: true,
    },
    compoundVariants: [
      ...mapVariant('size', {
        xs: { contentInner: 'px-1.5 py-0.5 text-xs' },
        sm: { contentInner: 'px-2 py-1 text-sm' },
        base: { contentInner: 'px-2.5 py-1.5 text-base' },
        lg: { contentInner: 'px-3 py-2 text-lg' },
      }),
      {
        bordered: true,
        class: {
          content: 'border',
        },
      },
    ],
  }, 'rui-hover-card',
)

export type HoverCardVariants = VariantProps<typeof tvHoverCard>