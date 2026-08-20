import type { ReactNode } from 'react'
import type { ThemeProps } from './theme-props'
import { ScopeThemeContext } from './theme-props'

export interface ThemeProviderProps {
  value?: ThemeProps
  children?: ReactNode
}

/** User-facing ThemeProvider: always provides Scope Theme for descendants. */
export function ThemeProvider({ value, children }: ThemeProviderProps) {
  return (
    <ScopeThemeContext.Provider value={value ?? {}}>
      {children}
    </ScopeThemeContext.Provider>
  )
}
