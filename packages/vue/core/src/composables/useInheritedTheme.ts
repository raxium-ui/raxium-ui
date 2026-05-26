import type { MaybeRefOrGetter } from 'vue'
import type { Crafts, ThemeProps } from '../providers/theme/theme-props'
import { omitBy } from 'es-toolkit'
import { isNil } from 'es-toolkit/compat'
import { computed, toValue } from 'vue'
import { injectComponentTheme } from '../providers/theme/theme-props'

type UseThemeReturn = import('vue').ComputedRef<Omit<ThemeProps, 'crafts'> & { crafts: Crafts }>

/**
 * Lightweight theme composable for sub-components (e.g., AccordionTrigger, DialogContent).
 * Use this for structural sub-components (Content/Item/Trigger/Header, etc.)
 * that should inherit the parent component's resolved theme boundary.
 *
 * Unlike `useTheme()` which performs full merge (defaults → global config →
 * component config → context → props),
 * this simply reads the parent theme from ThemeProvider context and merges only
 * the component's own prop overrides. Much cheaper for sub-components that don't
 * need craft overrides.
 */
export function useInheritedTheme(
  props?: MaybeRefOrGetter<Partial<ThemeProps> | undefined>,
): UseThemeReturn {
  const parentTheme = injectComponentTheme(computed(() => ({})))

  if (!props) {
    return parentTheme as UseThemeReturn
  }

  return computed(() => {
    const propsValue = omitBy(toValue(props) ?? {}, value => isNil(value))

    if (Object.keys(propsValue).length === 0) {
      return parentTheme.value as Omit<ThemeProps, 'crafts'> & { crafts: Crafts }
    }

    return {
      ...parentTheme.value,
      ...propsValue,
    } as Omit<ThemeProps, 'crafts'> & { crafts: Crafts }
  })
}
