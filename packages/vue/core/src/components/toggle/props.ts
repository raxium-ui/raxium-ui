import type { ToggleRootBaseProps } from '@ark-ui/vue'
import type { ThemeCrafts } from '@raxium/vue/providers'
import type { HTMLAttributes } from 'vue'

export interface ToggleProps extends ToggleRootBaseProps, ThemeCrafts<'tvToggle'> {
  class?: HTMLAttributes['class']
}
