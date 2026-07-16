import type { ComputedRef, MaybeRefOrGetter } from 'vue'
import type { ResolvedTheme, ThemeProps } from '../providers/theme/theme-props'
import { computed, toValue } from 'vue'
import { provideComponentTheme, provideScopeTheme } from '../providers/theme/theme-props'

interface ProvideComponentThemeOptions {
  /**
   * Whether to provide Scope Theme when the component has explicit `:theme`.
   * Default true.
   */
  provideScopeFromPropsTheme?: boolean
}

/**
 * Provides the two-channel theme context for a component root node.
 * Prefer:
 * - `useProvideComponentTheme` for independent/root components
 * - `useProvideStructuralComponentTheme` for structural sub-components
 *   that should not leak local `:theme` into Scope Theme.
 *
 * - **Component Theme** (always provided): consumed by sub-components via
 *   `useInheritedTheme` (e.g. DialogContent, AccordionItem). Carries the
 *   component's fully-resolved theme (tokens + crafts) so children inherit it.
 *
 * - **Scope Theme** (conditional, tokens only): consumed by independent
 *   descendant components via `useTheme` (e.g. a Tooltip nested inside a Dialog).
 *   Only provided when the component received an explicit `:theme` prop.
 *   Does not include crafts — crafts come from `RUIConfig.theme.crafts`.
 *
 * @param theme   Fully resolved theme from `useTheme()` / `useThemeCraft()`.
 * @param getPropsTheme  Getter that returns the raw `:theme` prop value.
 * @param options  Optional behavior flags for Scope Theme provisioning.
 */
export function useProvideComponentTheme(
  theme: ComputedRef<ResolvedTheme>,
  getPropsTheme?: MaybeRefOrGetter<Partial<ThemeProps> | undefined>,
  options: ProvideComponentThemeOptions = {},
) {
  const { provideScopeFromPropsTheme = true } = options

  // Component Theme: always provided for sub-component inheritance
  provideComponentTheme(theme)

  // Scope Theme: only when the component received an explicit :theme prop
  if (!provideScopeFromPropsTheme)
    return

  const hasExplicitTheme = computed(() => {
    if (!getPropsTheme)
      return false
    const val = toValue(getPropsTheme)
    return val !== undefined && val !== null
  })

  if (hasExplicitTheme.value) {
    // Tokens only — never leak crafts into Scope Theme
    provideScopeTheme(computed(() => {
      const { skin, surface, size, unstyled, bordered } = theme.value
      return { skin, surface, size, unstyled, bordered }
    }))
  }
}

/**
 * Structural sub-components should not leak their local `:theme` to Scope Theme.
 * They still provide Component Theme so internals can inherit correctly.
 */
export function useProvideStructuralComponentTheme(
  theme: ComputedRef<ResolvedTheme>,
  getPropsTheme?: MaybeRefOrGetter<Partial<ThemeProps> | undefined>,
) {
  useProvideComponentTheme(theme, getPropsTheme, { provideScopeFromPropsTheme: false })
}
