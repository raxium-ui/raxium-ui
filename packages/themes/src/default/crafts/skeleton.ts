import type { VariantProps } from '../../utils/tv'
import { tv } from '../../utils/tv'
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
