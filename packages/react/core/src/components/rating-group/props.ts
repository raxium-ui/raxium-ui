import type {
  RatingGroupItemBaseProps,
  RatingGroupRootBaseProps,
} from '@ark-ui/react/rating-group'
import type { ThemeCrafts, ThemeNoCrafts } from '@raxium/react/providers/theme'
import type { HTMLAttributes, ReactNode } from 'react'

type ClassName = HTMLAttributes<HTMLElement>['className']

export interface RatingGroupProps extends RatingGroupRootBaseProps, ThemeCrafts<'tvRatingGroup'> {
  className?: ClassName
  prefix?: ReactNode
  suffix?: ReactNode
  children?: ReactNode
  ui?: {
    root?: ClassName
    control?: ClassName
  }
}

export interface RatingGroupItemProps extends RatingGroupItemBaseProps, ThemeNoCrafts {
  className?: ClassName
  /** Replaces default stars. Use `useRatingGroupItemContext` for highlighted / half / checked. */
  indicator?: ReactNode
  children?: ReactNode
  ui?: {
    root?: ClassName
    indicator?: ClassName
    icon?: ClassName
  }
}
