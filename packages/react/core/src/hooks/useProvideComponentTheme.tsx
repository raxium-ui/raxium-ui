import type { ReactNode } from 'react'
import type { ResolvedTheme, ThemeProps } from '../providers/theme/theme-props'
import { useMemo } from 'react'
import { ComponentThemeContext, ScopeThemeContext } from '../providers/theme/theme-props'

export interface ProvideComponentThemeProps {
  theme: ResolvedTheme
  propsTheme?: Partial<ThemeProps>
  /**
   * Whether to provide Scope Theme when the component has explicit `theme`.
   * Default true.
   */
  provideScopeFromPropsTheme?: boolean
  children?: ReactNode
}

/**
 * Provides the two-channel theme context for a component root node.
 */
export function ProvideComponentTheme({
  theme,
  propsTheme,
  provideScopeFromPropsTheme = true,
  children,
}: ProvideComponentThemeProps) {
  const scopeTokens = useMemo(() => {
    const { skin, surface, size, unstyled, bordered } = theme
    return { skin, surface, size, unstyled, bordered }
  }, [theme])

  const hasExplicitTheme = provideScopeFromPropsTheme && propsTheme != null

  return (
    <ComponentThemeContext.Provider value={theme}>
      {hasExplicitTheme
        ? (
            <ScopeThemeContext.Provider value={scopeTokens}>
              {children}
            </ScopeThemeContext.Provider>
          )
        : children}
    </ComponentThemeContext.Provider>
  )
}

/** Structural sub-components should not leak local `theme` into Scope Theme. */
export function ProvideStructuralComponentTheme({
  theme,
  children,
}: Omit<ProvideComponentThemeProps, 'propsTheme' | 'provideScopeFromPropsTheme'>) {
  return (
    <ProvideComponentTheme theme={theme} provideScopeFromPropsTheme={false}>
      {children}
    </ProvideComponentTheme>
  )
}
