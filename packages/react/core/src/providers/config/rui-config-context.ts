import type { IconifyIcon, IconifyJSON, PartialIconifyAPIConfig } from '@iconify/react'
import type { ThemeConfig, ThemeCrafts } from '../theme/theme-props'
import { createContext } from 'react'

export interface RUIConfigContext {
  /**
   * App theme: tokens (`skin` / `surface` / …) plus optional `crafts` table
   * overrides. Crafts are merged only from this field — not from
   * ThemeProvider or component `theme`.
   */
  'theme'?: ThemeConfig
  'tooltip'?: {
    closeDelay?: number
    openDelay?: number
    lazyMount?: boolean
    unmountOnExit?: boolean
    placement?: string
    theme?: ThemeCrafts<'tvTooltip'>['theme']
  }
  'date-picker'?: {
    lazyMount?: boolean
    unmountOnExit?: boolean
    placement?: string
    theme?: ThemeCrafts<'tvDatePicker'>['theme']
  }
  'hover-card'?: {
    closeDelay?: number
    openDelay?: number
    lazyMount?: boolean
    unmountOnExit?: boolean
    placement?: string
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
    placement?: string
    theme?: ThemeCrafts<'tvPopover'>['theme']
  }
  'menu'?: {
    lazyMount?: boolean
    unmountOnExit?: boolean
    placement?: string
    theme?: ThemeCrafts<'tvMenu'>['theme']
  }
  'select'?: {
    lazyMount?: boolean
    unmountOnExit?: boolean
    placement?: string
    theme?: ThemeCrafts<'tvSelect'>['theme']
  }
  'iconify'?: {
    addIcons?: Array<[string, IconifyIcon | null]>
    addCollections?: Array<[IconifyJSON, string | undefined]>
    addAPIProviders?: Array<[string, PartialIconifyAPIConfig]>
  }
  'depth'?: {
    /**
     * Base z-index for the depth stack. Accepts any valid CSS z-index value.
     * Defaults to `var(--z-modal)`.
     */
    baseZIndex?: string
    /**
     * Amount added per depth index. Defaults to `10`.
     */
    step?: number
  }
  /** Populated once Toaster / Messager components exist. */
  'toaster-manager'?: unknown
  'messager'?: unknown
}

export const RUIConfigReactContext = createContext<RUIConfigContext>({})
