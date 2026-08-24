import type { RatingGroupItemProps } from './props'
import { RatingGroup as ArkRatingGroup, useRatingGroupItemContext } from '@ark-ui/react/rating-group'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useInheritedTheme } from '@raxium/react/hooks/useInheritedTheme'
import { cxc } from '@raxium/themes/utils'
import { Star } from 'lucide-react'
import { forwardRef } from 'react'

function DefaultIndicator({
  indicatorClassName,
  iconClassName,
}: {
  indicatorClassName?: string
  iconClassName?: string
}) {
  const { highlighted, half } = useRatingGroupItemContext()

  return (
    <span
      className={indicatorClassName}
      data-highlighted={highlighted ? '' : undefined}
      data-half={half ? '' : undefined}
    >
      <Star className={iconClassName} data-bg="" />
      <Star className={iconClassName} data-fg="" />
    </span>
  )
}

export const RatingGroupItem = forwardRef<HTMLSpanElement, RatingGroupItemProps>(
  ({ className, theme: propsTheme, ui, indicator, children, ...props }, ref) => {
    const theme = useInheritedTheme(propsTheme)
    const crafts = useCraft(theme, 'tvRatingGroup')

    return (
      <ArkRatingGroup.Item
        ref={ref}
        className={crafts.item(cxc(ui?.root, className))}
        {...props}
      >
        {indicator ?? children ?? (
          <DefaultIndicator
            indicatorClassName={crafts.itemIndicator(cxc(ui?.indicator))}
            iconClassName={crafts.itemIndicatorIcon(cxc(ui?.icon))}
          />
        )}
      </ArkRatingGroup.Item>
    )
  },
)

RatingGroupItem.displayName = 'RatingGroup.Item'
