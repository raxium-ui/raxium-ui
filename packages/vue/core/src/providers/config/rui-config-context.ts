import type { IconifyIcon, IconifyJSON, PartialIconifyAPIConfig } from '@iconify/vue'
import type { MessagerExpose } from '@raxium/vue/components/message'
import type { ToasterManagerExpose } from '@raxium/vue/components/toast'
import type * as popper from '@zag-js/popper'
import type { ComputedRef } from 'vue'
import type { ThemeConfig, ThemeCrafts } from '../theme/theme-props'
import { createContext } from '@ark-ui/vue'

export interface RUIConfigContext {
  /**
   * App theme: tokens (`skin` / `surface` / …) plus optional `crafts` table
   * overrides (presets). Crafts are merged only from this field — not from
   * ThemeProvider or component `:theme`.
   */
  'theme'?: ThemeConfig
  'tooltip'?: {
    closeDelay?: number
    openDelay?: number
    lazyMount?: boolean
    unmountOnExit?: boolean
    placement?: popper.Placement
    theme?: ThemeCrafts<'tvTooltip'>['theme']
  }
  'date-picker'?: {
    lazyMount?: boolean
    unmountOnExit?: boolean
    placement?: popper.Placement
    theme?: ThemeCrafts<'tvDatePicker'>['theme']
  }
  'hover-card'?: {
    closeDelay?: number
    openDelay?: number
    lazyMount?: boolean
    unmountOnExit?: boolean
    placement?: popper.Placement
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
    placement?: popper.Placement
    theme?: ThemeCrafts<'tvPopover'>['theme']
  }
  'menu'?: {
    lazyMount?: boolean
    unmountOnExit?: boolean
    placement?: popper.Placement
    theme?: ThemeCrafts<'tvMenu'>['theme']
  }
  'select'?: {
    lazyMount?: boolean
    unmountOnExit?: boolean
    placement?: popper.Placement
    theme?: ThemeCrafts<'tvSelect'>['theme']
  }
  'iconify'?: {
    addIcons?: Array<[string, IconifyIcon | null]>
    addCollections?: Array<[IconifyJSON, string | undefined]>
    addAPIProviders?: Array<[string, PartialIconifyAPIConfig]>
  }
  'depth'?: {
    /**
     * Base z-index for the depth stack. Accepts any valid CSS z-index value
     * (raw number as string, `calc(...)`, or `var(--...)`). Defaults to
     * `var(--z-modal)`.
     */
    baseZIndex?: string
    /**
     * Amount added per depth index. Each root owner claims a `step`-sized band
     * inside which slot offsets (backdrop / content / floating) live. Defaults
     * to `10`.
     */
    step?: number
  }
  'toaster-manager'?: ToasterManagerExpose | null
  'messager'?: MessagerExpose | null
}

export const [provideRUIConfigContext, injectRUIConfigContext]
  = createContext<ComputedRef<RUIConfigContext>>('RUIConfigContext')
