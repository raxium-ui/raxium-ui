import type { VariantProps } from '../../utils'
import { tv } from '../../utils'
/**
 * @color razer/components/skeleton.css
 */
export const tvSkeleton = tv(
  {
    base: '',
    variants: {
      variant: {
        pulse: 'animate-pulse',
        wave: 'animate-skeleton-wave animate-infinite',
      },
      shape: {
        rect: 'rounded',
        circle: 'rounded-full',
      },
    },
  }, 'rui-skeleton',
)

export type SkeletonVariants = VariantProps<typeof tvSkeleton>
