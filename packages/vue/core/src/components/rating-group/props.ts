import type { RatingGroupItemBaseProps, RatingGroupRootBaseProps } from '@ark-ui/vue'
import type { ThemeCrafts, ThemeNoCrafts } from '@raxium/vue/providers'
import type { HTMLAttributes } from 'vue'

export interface RatingGroupProps extends RatingGroupRootBaseProps, ThemeCrafts<'tvRatingGroup'> {
  class?: HTMLAttributes['class']
  ui?: {
    root?: HTMLAttributes['class']
    control?: HTMLAttributes['class']
  }
}

export interface RatingGroupItemProps extends RatingGroupItemBaseProps, ThemeNoCrafts {
  class?: HTMLAttributes['class']
  ui?: {
    root?: HTMLAttributes['class']
    indicator?: HTMLAttributes['class']
    icon?: HTMLAttributes['class']
  }
}
