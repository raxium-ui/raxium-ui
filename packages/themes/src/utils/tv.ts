import type {
  ClassValue,
  TVCompoundSlots,
  TVCompoundVariants,
  TVDefaultVariants,
  TVReturnType,
  TVVariants,
} from 'tailwind-variants'
import { tv as originTv } from 'tailwind-variants'

type TVSlots = Record<string, ClassValue> | undefined
export type { VariantProps } from 'tailwind-variants'

export function tv<
  V extends TVVariants<S, B, EV>,
  CV extends TVCompoundVariants<V, S, B, EV, ES>,
  DV extends TVDefaultVariants<V, S, EV, ES>,
  B extends ClassValue = undefined,
  S extends TVSlots = undefined,
  // @ts-expect-error error in tailwind-variants
  E extends TVReturnType = TVReturnType<
    V,
    S,
    B,
    // @ts-expect-error error in tailwind-variants
    EV extends undefined ? {} : EV,
    // @ts-expect-error error in tailwind-variants
    ES extends undefined ? {} : ES
  >,
  EV extends TVVariants<ES, B, E['variants'], ES> = E['variants'],
  ES extends TVSlots = E['slots'] extends TVSlots ? E['slots'] : undefined,
>(
  options: {
    extend?: E
    base?: B
    slots?: S
    variants?: V
    compoundVariants?: CV
    compoundSlots?: TVCompoundSlots<V & { unstyled: { true: ClassValue, false: ClassValue } }, S, B>
    defaultVariants?: DV
  },
  ruiConfig?: {
    class?: ClassValue
    className?: ClassValue
    slots?: Record<keyof S, ClassValue>
  },
  config?: any,
) {
  type mergedV = V & { unstyled: { true: ClassValue, false: ClassValue } }

  // fix: extend时, ruiConfig丢失
  const _ruiConfig = ruiConfig ?? options.extend?._ruiConfig
  const variants = {
    ...(options.variants ?? {}),
    unstyled: {
      true: '',
      false: _ruiConfig?.class ?? _ruiConfig?.className ?? '',
    },
  }

  const unstyledCompoundSlots: any[] = []
  for (const key in _ruiConfig?.slots) {
    unstyledCompoundSlots.push({
      slots: [key],
      unstyled: false,
      class: _ruiConfig?.slots[key],
    })
  }
  options.variants = variants as V
  options.defaultVariants = {
    ...(options.defaultVariants ?? {}),
    unstyled: false,
  } as unknown as DV

  options.compoundSlots = (options.compoundSlots ?? []).concat(unstyledCompoundSlots)

  const result: any = originTv(options as any, config)
  result._ruiConfig = ruiConfig
  return result as ReturnType<
    typeof originTv<
      mergedV,
      TVCompoundVariants<mergedV, S, B, EV, ES>,
      TVDefaultVariants<mergedV, S, EV, ES>,
      B,
      S,
      E,
      EV,
      ES
    >
  >
}
