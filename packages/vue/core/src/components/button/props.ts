import type { ButtonVariants } from '@raxium/themes/default'
import type { ThemeCrafts } from '@raxium/vue/providers'
import type { HTMLAttributes } from 'vue'

export interface ButtonProps extends ThemeCrafts<'tvButton'> {
  variant?: ButtonVariants['variant'] | string
  class?: HTMLAttributes['class']
  disabled?: boolean
  tooltip?: string
  ripple?: boolean
  loading?: boolean
  asChild?: boolean
  ui?: {
    root?: {
      class?: HTMLAttributes['class']
    }
    loading?: {
      class?: HTMLAttributes['class']
    }
  }
}
