import type { ThemeCrafts } from '@raxium/react/providers/theme'
import type { SkeletonVariants } from '@raxium/themes/default'
import type { HTMLAttributes, ReactNode } from 'react'

export interface SkeletonProps extends ThemeCrafts<'tvSkeleton'>, HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariants['variant']
  shape?: SkeletonVariants['shape']
  children?: ReactNode
}
