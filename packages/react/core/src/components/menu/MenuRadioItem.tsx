import type { ReactNode } from 'react'
import type { MenuRadioItemProps } from './props'
import { Menu as ArkMenu, useMenuItemContext } from '@ark-ui/react/menu'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useInheritedTheme } from '@raxium/react/hooks/useInheritedTheme'
import { cn, cxc } from '@raxium/themes/utils'
import { Check, Circle } from 'lucide-react'
import { forwardRef, useMemo } from 'react'

function DefaultRadioIndicator({
  variant,
  indicatorClassName,
}: {
  variant: NonNullable<MenuRadioItemProps['variant']>
  indicatorClassName?: string
}) {
  const context = useMenuItemContext()
  const theme = useInheritedTheme()
  const crafts = useCraft(theme, 'tvMenu')
  const radioVariants = useMemo(() => ({ variant }), [variant])
  const radioCrafts = useCraft(theme, 'tvRadioGroup', radioVariants)
  const iconProps = {
    className: radioCrafts.itemIndicator(),
    'data-part': 'indicator',
    'data-state': context.checked ? 'checked' : 'unchecked',
    'data-variant': variant,
    hidden: context.checked ? undefined : true,
  }

  let icon: ReactNode
  switch (variant) {
    case 'default':
      icon = <Circle {...iconProps} />
      break
    case 'checkbox':
      icon = <Check {...iconProps} />
      break
    default: {
      const _exhaustive: never = variant
      return _exhaustive
    }
  }

  return (
    <span className={crafts.itemIndicator(cxc(indicatorClassName))}>
      {icon}
    </span>
  )
}

export const MenuRadioItem = forwardRef<HTMLDivElement, MenuRadioItemProps>(
  (
    {
      className,
      theme: propsTheme,
      variant = 'default',
      ui,
      indicator,
      children,
      ...props
    },
    ref,
  ) => {
    const theme = useInheritedTheme(propsTheme)
    const crafts = useCraft(theme, 'tvMenu')

    return (
      <ArkMenu.RadioItem
        ref={ref}
        className={cn(crafts.item(), crafts.radioItem(cxc(ui?.root, className)))}
        {...props}
      >
        {children}
        {indicator ?? (
          <DefaultRadioIndicator variant={variant} indicatorClassName={ui?.indicator} />
        )}
      </ArkMenu.RadioItem>
    )
  },
)

MenuRadioItem.displayName = 'Menu.RadioItem'
