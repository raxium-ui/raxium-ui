import type { SkeletonVariants } from '@raxium/themes/default'
import type { ThemeCrafts } from '@raxium/vue/providers'
import type { HTMLAttributes } from 'vue'

export interface SkeletonProps extends ThemeCrafts<'tvSkeleton'> {
  class?: HTMLAttributes['class']
  variant?: SkeletonVariants['variant']
  shape?: SkeletonVariants['shape']
}
