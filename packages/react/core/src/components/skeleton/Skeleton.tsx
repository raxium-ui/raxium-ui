import type { SkeletonProps } from './props'
import { ark } from '@ark-ui/react/factory'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useTheme } from '@raxium/react/hooks/useTheme'
import { cxc } from '@raxium/themes/utils'
import { forwardRef, useMemo } from 'react'

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      className,
      theme: propsTheme,
      craft,
      variant = 'pulse',
      shape = 'rect',
      children,
      ...props
    },
    ref,
  ) => {
    const theme = useTheme(propsTheme)
    const variants = useMemo(() => ({ variant, shape }), [variant, shape])
    const crafts = useCraft(theme, 'tvSkeleton', variants, craft)

    return (
      <ark.div
        ref={ref}
        className={crafts(cxc(className))}
        data-shape={shape}
        data-variant={variant}
        {...props}
      >
        {children}
      </ark.div>
    )
  },
)

Skeleton.displayName = 'Skeleton'
