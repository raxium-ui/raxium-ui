import type {
  IconifyIcon,
  IconifyJSON,
  PartialIconifyAPIConfig,
} from '@iconify/vue'
import type { MessagerExpose } from '@raxium/vue/components/message'
import type { ToasterManagerExpose } from '@raxium/vue/components/toast'
import type { ComputedRef } from 'vue'
import type { ThemeCrafts, ThemeProps } from '../theme/theme-props'
import { createContext } from '@ark-ui/vue'

export interface RUIConfigContext {
  'theme'?: ThemeProps
  'tooltip'?: {
    closeDelay?: number
    openDelay?: number
    lazyMount?: boolean
    unmountOnExit?: boolean
    theme?: ThemeCrafts<'tvTooltip'>['theme']
  }
  'date-picker'?: {
    lazyMount?: boolean
    unmountOnExit?: boolean
    theme?: ThemeCrafts<'tvDatePicker'>['theme']
  }
  'hover-card'?: {
    closeDelay?: number
    openDelay?: number
    lazyMount?: boolean
    unmountOnExit?: boolean
    theme?: ThemeCrafts<'tvHoverCard'>['theme']
  }
  'dialog'?: {
    lazyMount?: boolean
    unmountOnExit?: boolean
    theme?: ThemeCrafts<'tvDialog'>['theme']
  }
  'popover'?: {
    lazyMount?: boolean
    unmountOnExit?: boolean
    theme?: ThemeCrafts<'tvPopover'>['theme']
  }
  'menu'?: {
    lazyMount?: boolean
    unmountOnExit?: boolean
    theme?: ThemeCrafts<'tvMenu'>['theme']
  }
  'select'?: {
    lazyMount?: boolean
    unmountOnExit?: boolean
    theme?: ThemeCrafts<'tvSelect'>['theme']
  }
  'iconify'?: {
    addIcons?: Array<[string, IconifyIcon | null]>
    addCollections?: Array<[IconifyJSON, string | undefined]>
    addAPIProviders?: Array<[string, PartialIconifyAPIConfig]>
  }
  'toaster-manager'?: ToasterManagerExpose | null
  'messager'?: MessagerExpose | null
}

export const [provideRUIConfigContext, injectRUIConfigContext]
  = createContext<ComputedRef<RUIConfigContext>>('RUIConfigContext')
