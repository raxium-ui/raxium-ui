import type { ReactNode } from 'react'
import type { ResolvedTheme } from './theme-props'
import { useTheme } from '@raxium/react/hooks/useTheme'

export interface ThemeContextProps {
  children: (theme: ResolvedTheme) => ReactNode
}

/** Render-prop access to the fully resolved theme. */
export function ThemeContext({ children }: ThemeContextProps) {
  const theme = useTheme()
  return children(theme)
}
