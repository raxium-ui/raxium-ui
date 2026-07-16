import type { ResolvedTheme, ThemeProps } from '../providers/theme/theme-props'
import { mergeCraftTables } from '@raxium/themes/runtime'
import { omitBy } from 'es-toolkit'
import { isNil } from 'es-toolkit/compat'
import type { MaybeRefOrGetter } from 'vue'
import { computed, toValue } from 'vue'
import { injectComponentTheme } from '../providers/theme/theme-props'

type UseThemeReturn = import('vue').ComputedRef<ResolvedTheme>

/**
 * Lightweight theme composable for sub-components (e.g., AccordionTrigger, DialogContent).
 * Use this for structural sub-components (Content/Item/Trigger/Header, etc.)
 * that should inherit the parent component's resolved theme boundary.
 *
 * Unlike `useTheme()` which performs full merge (defaults → global config →
 * component config → scope → props),
 * this simply reads the parent theme from Component Theme context and merges only
 * the component's own prop overrides. Much cheaper for sub-components that don't
 * need craft overrides. Instance `craft` overrides are inherited when the parent
 * baked them via `useThemeCraft`.
 */
export function useInheritedTheme(
  props?: MaybeRefOrGetter<Partial<ThemeProps> | undefined>,
): UseThemeReturn {
  const parentTheme = injectComponentTheme(computed(() => ({
    crafts: mergeCraftTables(),
  })))

  if (!props) {
    return parentTheme
  }

  return computed(() => {
    const propsValue = omitBy(toValue(props) ?? {}, value => isNil(value))

    if (Object.keys(propsValue).length === 0) {
      return parentTheme.value
    }

    return {
      ...parentTheme.value,
      ...propsValue,
    }
  })
}
