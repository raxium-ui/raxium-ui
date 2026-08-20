import type { RuiPresetInput } from '@raxium/themes/utils'
import type { ReactNode } from 'react'
import type { RUIConfigContext } from './rui-config-context'
import { addAPIProvider, addCollection, addIcon } from '@iconify/react'
import { usePreferredColorScheme } from '@raxium/react/hooks/usePreferredColorScheme'
import { applyRuiCrafts } from '@raxium/themes/utils'
import { useEffect, useMemo } from 'react'
import { RUIConfigReactContext } from './rui-config-context'

export interface RUIConfigProps {
  theme?: RUIConfigContext['theme']
  /** Skin pack(s). Unlisted `tv*` keep library defaults. */
  preset?: RuiPresetInput
  tooltip?: RUIConfigContext['tooltip']
  dialog?: RUIConfigContext['dialog']
  hoverCard?: RUIConfigContext['hover-card']
  popover?: RUIConfigContext['popover']
  menu?: RUIConfigContext['menu']
  select?: RUIConfigContext['select']
  datePicker?: RUIConfigContext['date-picker']
  iconify?: RUIConfigContext['iconify']
  depth?: RUIConfigContext['depth']
  children?: ReactNode
}

const defaultTheme: NonNullable<RUIConfigContext['theme']> = {
  skin: undefined,
  surface: undefined,
  size: 'base',
  unstyled: false,
  bordered: true,
}

export function RUIConfig({
  theme = defaultTheme,
  preset,
  tooltip = {
    openDelay: 0,
    closeDelay: 0,
    lazyMount: false,
    unmountOnExit: false,
    placement: 'top',
    theme: undefined,
  },
  hoverCard = {
    openDelay: 0,
    closeDelay: 300,
    lazyMount: true,
    unmountOnExit: true,
    placement: 'bottom',
    theme: undefined,
  },
  dialog = {
    lazyMount: true,
    unmountOnExit: true,
    theme: undefined,
  },
  popover = {
    lazyMount: true,
    unmountOnExit: true,
    placement: 'bottom',
    theme: undefined,
  },
  menu = {
    lazyMount: true,
    unmountOnExit: true,
    placement: 'bottom-start',
    theme: undefined,
  },
  select = {
    lazyMount: false,
    unmountOnExit: false,
    placement: 'bottom-start',
    theme: undefined,
  },
  datePicker = {
    lazyMount: true,
    unmountOnExit: true,
    placement: 'bottom',
    theme: undefined,
  },
  iconify = {
    addIcons: [],
    addCollections: [],
    addAPIProviders: [],
  },
  depth,
  children,
}: RUIConfigProps) {
  const systemSurface = usePreferredColorScheme()

  useEffect(() => {
    iconify.addIcons?.forEach(([icon, iconifyIcon]) => {
      if (iconifyIcon)
        addIcon(icon, iconifyIcon)
    })
    iconify.addCollections?.forEach(([collection, provider]) => {
      addCollection(collection, provider)
    })
    iconify.addAPIProviders?.forEach(([provider, config]) => {
      addAPIProvider(provider, config)
    })
  }, [iconify])

  useEffect(() => {
    const el = document.documentElement
    const { skin, surface } = theme ?? {}
    if (skin)
      el.dataset.themeSkin = skin
    else
      delete el.dataset.themeSkin

    if (surface)
      el.dataset.themeSurface = surface === 'system' ? systemSurface : surface
    else
      delete el.dataset.themeSurface
  }, [theme, systemSurface])

  const value = useMemo<RUIConfigContext>(() => {
    const { crafts: craftsEscape, ...tokens } = theme ?? {}
    return {
      'theme': {
        ...tokens,
        crafts: applyRuiCrafts(preset, craftsEscape),
      },
      tooltip,
      dialog,
      'hover-card': hoverCard,
      popover,
      menu,
      select,
      'date-picker': datePicker,
      iconify,
      depth,
    }
  }, [theme, preset, tooltip, dialog, hoverCard, popover, menu, select, datePicker, iconify, depth])

  return (
    <RUIConfigReactContext.Provider value={value}>
      {children}
    </RUIConfigReactContext.Provider>
  )
}
