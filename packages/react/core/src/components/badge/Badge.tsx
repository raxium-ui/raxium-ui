import type { Ref } from 'react'
import type { BadgeProps } from './props'
import { ark } from '@ark-ui/react/factory'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useTheme } from '@raxium/react/hooks/useTheme'
import { cxc } from '@raxium/themes/utils'
import { forwardRef, useMemo } from 'react'

export const Badge = forwardRef<HTMLElement, BadgeProps>(
  (
    {
      className,
      theme: propsTheme,
      craft,
      as = 'div',
      asChild,
      variant,
      children,
      ...props
    },
    ref,
  ) => {
    const theme = useTheme(propsTheme)
    const variants = useMemo(() => ({ variant }), [variant])
    const crafts = useCraft(theme, 'tvBadge', variants, craft)
    const classNameResolved = crafts(cxc(className))

    switch (as) {
      case 'sup':
        return (
          <ark.sup
            ref={ref}
            className={classNameResolved}
            data-variant={variant}
            asChild={asChild}
            {...props}
          >
            {children}
          </ark.sup>
        )
      case 'div':
        return (
          <ark.div
            ref={ref as Ref<HTMLDivElement>}
            className={classNameResolved}
            data-variant={variant}
            asChild={asChild}
            {...props}
          >
            {children}
          </ark.div>
        )
      default: {
        const _exhaustive: never = as
        return _exhaustive
      }
    }
  },
)

Badge.displayName = 'Badge'
