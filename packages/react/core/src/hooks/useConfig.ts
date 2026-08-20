import type { RUIConfigContext } from '../providers/config/rui-config-context'
import { camelCase, defaults } from 'es-toolkit/compat'
import { useContext, useMemo } from 'react'
import { RUIConfigReactContext } from '../providers/config/rui-config-context'

export function useConfig<T extends keyof RUIConfigContext>(
  scope: T,
  props?: RUIConfigContext[T],
): RUIConfigContext[T] {
  const ruiConfig = useContext(RUIConfigReactContext)
  return useMemo(
    () =>
      defaults(
        props,
        ruiConfig[camelCase(scope) as keyof RUIConfigContext] ?? {},
      ) as RUIConfigContext[T],
    [props, ruiConfig, scope],
  )
}
