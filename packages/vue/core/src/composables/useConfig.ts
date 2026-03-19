import type { ComputedRef, MaybeRefOrGetter } from 'vue'
import type { RUIConfigContext } from '../providers/config/rui-config-context'
import { camelCase, defaults } from 'es-toolkit/compat'
import { computed, toValue } from 'vue'
import { injectRUIConfigContext } from '../providers/config/rui-config-context'

export function useConfig<T extends keyof RUIConfigContext>(
  scope: T,
  props?: MaybeRefOrGetter<RUIConfigContext[T]>,
): ComputedRef<RUIConfigContext[T]> {
  const ruiConfig = injectRUIConfigContext(computed(() => ({})))
  const propsConfig = computed(() => toValue(props))
  return computed(() =>
    defaults(
      propsConfig.value,
      ruiConfig.value[camelCase(scope) as keyof RUIConfigContext] ?? {},
    ),
  )
}
