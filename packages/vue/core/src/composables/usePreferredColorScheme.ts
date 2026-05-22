import { onScopeDispose, ref } from 'vue'

/**
 * Reactively tracks the system color scheme preference via
 * `matchMedia('(prefers-color-scheme: dark)')`.
 *
 * Returns a ref that is `'dark'` or `'light'`, updating automatically
 * when the OS / browser preference changes.
 */
export function usePreferredColorScheme() {
  const mql = window.matchMedia('(prefers-color-scheme: dark)')
  const scheme = ref<'light' | 'dark'>(mql.matches ? 'dark' : 'light')

  const handler = (e: MediaQueryListEvent) => {
    scheme.value = e.matches ? 'dark' : 'light'
  }

  mql.addEventListener('change', handler)
  onScopeDispose(() => mql.removeEventListener('change', handler))

  return scheme
}
