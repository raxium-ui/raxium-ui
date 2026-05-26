import type { ComputedRef, MaybeRefOrGetter } from 'vue'
import type { ThemeProps } from '../providers/theme/theme-props'
import { computed, toValue } from 'vue'
import { provideComponentTheme, provideScopeTheme } from '../providers/theme/theme-props'

type ResolvedTheme = ComputedRef<ThemeProps>

/**
 * Provides the two-channel theme context for a component root node.
 *
 * - **Component Theme** (always provided): consumed by sub-components via
 *   `useInheritedTheme` (e.g. DialogContent, AccordionItem). Carries the
 *   component's fully-resolved theme so its own children inherit it correctly.
 *
 * - **Scope Theme** (conditional): consumed by independent descendant components
 *   via `useTheme` (e.g. a Tooltip nested inside a Dialog). Only provided when
 *   the component received an explicit `:theme` prop, so it does NOT shadow a
 *   parent user-scoped ThemeProvider when the component itself has no explicit
 *   theme set. This allows `componentConfig` to win over intermediate container
 *   context in the priority chain.
 *
 * @param theme   Fully resolved theme from `useTheme()`.
 * @param getPropsTheme  Getter that returns the raw `:theme` prop value.
 *   When `undefined` / not provided, Scope Theme is not provided.
 */
export function useProvideComponentTheme(
  theme: ResolvedTheme,
  getPropsTheme?: MaybeRefOrGetter<Partial<ThemeProps> | undefined>,
) {
  // Component Theme: always provided for sub-component inheritance
  provideComponentTheme(theme)

  // Scope Theme: only when the component received an explicit :theme prop
  const hasExplicitTheme = computed(() => {
    if (!getPropsTheme)
      return false
    const val = toValue(getPropsTheme)
    return val !== undefined && val !== null
  })

  if (hasExplicitTheme.value) {
    provideScopeTheme(theme)
  }
}
