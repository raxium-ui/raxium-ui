import type { IconifyIcon } from '@iconify/vue'
import type { ThemeCrafts } from '@raxium/vue/providers/theme'
import type { HTMLAttributes } from 'vue'

export interface IconProps extends Omit<ThemeCrafts<'tvIcon'>, 'size'> {
  icon: string | IconifyIcon
  class?: HTMLAttributes['class']
}
