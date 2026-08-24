import type { CollectionItem } from '@ark-ui/react/select'
import type { SelectProps } from './props'
import { Select as ArkSelect } from '@ark-ui/react/select'
import { useConfig } from '@raxium/react/hooks/useConfig'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { ProvideComponentTheme } from '@raxium/react/hooks/useProvideComponentTheme'
import { useTheme } from '@raxium/react/hooks/useTheme'
import { useThemeCraft } from '@raxium/react/hooks/useThemeCraft'
import { cxc } from '@raxium/themes/utils'
import { defaults } from 'es-toolkit/compat'
import { useMemo } from 'react'

export function SelectRoot<T extends CollectionItem>({
  className,
  theme: propsTheme,
  craft,
  lazyMount,
  unmountOnExit,
  positioning,
  children,
  ...props
}: SelectProps<T>) {
  const selectConfig = useConfig('select', { lazyMount, unmountOnExit })
  const mergedPositioning = useMemo(
    () => defaults({ ...(positioning ?? {}) }, { placement: selectConfig?.placement }),
    [positioning, selectConfig?.placement],
  )
  const theme = useTheme(propsTheme, selectConfig?.theme)
  const themed = useThemeCraft(theme, 'tvSelect', craft)
  const crafts = useCraft(themed, 'tvSelect')

  return (
    <ProvideComponentTheme theme={themed} propsTheme={propsTheme}>
      <ArkSelect.Root
        className={crafts.root(cxc(className))}
        lazyMount={selectConfig?.lazyMount}
        unmountOnExit={selectConfig?.unmountOnExit}
        positioning={mergedPositioning}
        {...props}
      >
        {children}
        <ArkSelect.HiddenSelect />
      </ArkSelect.Root>
    </ProvideComponentTheme>
  )
}

SelectRoot.displayName = 'Select'
