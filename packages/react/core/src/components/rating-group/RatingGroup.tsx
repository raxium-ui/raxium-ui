import type { RatingGroupProps } from './props'
import { RatingGroup as ArkRatingGroup } from '@ark-ui/react/rating-group'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { ProvideComponentTheme } from '@raxium/react/hooks/useProvideComponentTheme'
import { useTheme } from '@raxium/react/hooks/useTheme'
import { useThemeCraft } from '@raxium/react/hooks/useThemeCraft'
import { cxc } from '@raxium/themes/utils'
import { forwardRef } from 'react'

export const RatingGroupRoot = forwardRef<HTMLDivElement, RatingGroupProps>(
  ({ className, theme: propsTheme, craft, ui, prefix, suffix, children, ...props }, ref) => {
    const theme = useTheme(propsTheme)
    const themed = useThemeCraft(theme, 'tvRatingGroup', craft)
    const crafts = useCraft(themed, 'tvRatingGroup')

    return (
      <ProvideComponentTheme theme={themed} propsTheme={propsTheme}>
        <ArkRatingGroup.Root
          ref={ref}
          className={crafts.root(cxc(ui?.root, className))}
          {...props}
        >
          {prefix}
          <ArkRatingGroup.Control className={crafts.control(cxc(ui?.control))}>
            {children}
          </ArkRatingGroup.Control>
          {suffix}
        </ArkRatingGroup.Root>
      </ProvideComponentTheme>
    )
  },
)

RatingGroupRoot.displayName = 'RatingGroup'
