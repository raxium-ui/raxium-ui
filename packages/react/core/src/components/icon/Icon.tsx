import type { IconProps } from './props'
import { Icon as IconifyIcon, type IconProps as IconifyReactIconProps } from '@iconify/react'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useTheme } from '@raxium/react/hooks/useTheme'
import { cxc } from '@raxium/themes/utils'

export function Icon({ className, theme: propsTheme, craft, icon, ...props }: IconProps) {
  const theme = useTheme(propsTheme)
  const crafts = useCraft(theme, 'tvIcon', undefined, craft)

  return (
    <IconifyIcon
      {...({
        className: crafts(cxc(className)),
        icon,
        ...props,
      } as IconifyReactIconProps)}
    />
  )
}

Icon.displayName = 'Icon'
