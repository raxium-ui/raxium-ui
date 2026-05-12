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

/** Convert camelCase to kebab-case: contentInner → content-inner */
function toKebab(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

export type RuiConfig = {
  /** Auto-derive slot class names from prefix. root → prefix, others → prefix-kebab(slotName) */
  prefix?: string
  class?: ClassValue
  className?: ClassValue
  slots?: Record<string, ClassValue>
}

/**
 * Auto-derive ruiConfig slot class names from a prefix string.
 * - `root` slot → bare prefix (e.g., 'rui-btn')
 * - other slots → `prefix-kebab(slotName)` (e.g., 'rui-btn-loading')
 * - If no slots (base-only craft) → set class to prefix
 */
function resolveRuiConfig(
  ruiConfigInput: string | RuiConfig | undefined,
  optionSlots: Record<string, any> | undefined,
  optionBase: any,
): RuiConfig | undefined {
  if (ruiConfigInput == null)
    return undefined

  // String shorthand: 'rui-btn' → { prefix: 'rui-btn' }
  const config: RuiConfig = typeof ruiConfigInput === 'string'
    ? { prefix: ruiConfigInput }
    : ruiConfigInput

  if (!config.prefix)
    return config

  const prefix = config.prefix

  // Base-only craft (no slots)
  if (!optionSlots && optionBase !== undefined) {
    return { ...config, class: config.class ?? prefix }
  }

  // Auto-derive slot class names
  if (optionSlots) {
    const autoSlots: Record<string, string> = {}
    for (const key of Object.keys(optionSlots)) {
      autoSlots[key] = key === 'root' ? prefix : `${prefix}-${toKebab(key)}`
    }
    // Explicit slots override auto-derived ones
    return { ...config, slots: { ...autoSlots, ...config.slots } }
  }

  return config
}

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
  ruiConfig?: string | RuiConfig,
  config?: any,
) {
  type mergedV = V & { unstyled: { true: ClassValue, false: ClassValue } }

  const resolved = resolveRuiConfig(ruiConfig, options.slots as any, options.base)

  // fix: extend时, ruiConfig丢失
  const _ruiConfig = resolved ?? options.extend?._ruiConfig
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
  result._ruiConfig = resolved
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
