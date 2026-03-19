import type { ToggleGroupItemBaseProps, ToggleGroupRootBaseProps } from '@ark-ui/vue'
import type { ThemeCrafts, ThemeNoCrafts } from '@raxium/vue/providers'
import type { HTMLAttributes } from 'vue'

export interface ToggleGroupProps extends ToggleGroupRootBaseProps, ThemeCrafts<'tvToggleGroup'> {
  class?: HTMLAttributes['class']
}
export interface ToggleGroupItemProps extends ToggleGroupItemBaseProps, ThemeNoCrafts {
  class?: HTMLAttributes['class']
}
