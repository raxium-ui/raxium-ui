import type { crafts as defaultCrafts } from '../default'
import { tv } from './tv'

/**
 * Represents the full set of craft definitions.
 * This is a type alias so preset.ts doesn't depend on the runtime crafts object.
 */
type Crafts = typeof defaultCrafts

/** The first argument accepted by tv() — craft configuration options */
type TVOptions = Parameters<typeof tv>[0]

/**
 * A composable theme preset that defines partial craft overrides.
 *
 * Presets can extend other presets, forming a chain. When resolved,
 * they are flattened from base → derived, with each layer extending
 * the previous via `tv({ extend })`.
 *
 * @example
 * ```ts
 * const enterprise = definePreset({
 *   name: 'enterprise',
 *   crafts: {
 *     tvButton: {
 *       defaultVariants: { variant: 'outlined' },
 *     },
 *   },
 * })
 * ```
 */
export interface CraftPreset {
  /** Human-readable preset name */
  name: string
  /** Base preset to extend (overrides are applied on top) */
  extend?: CraftPreset
  /** Partial craft overrides — only specify the crafts you want to change */
  crafts: Partial<Record<keyof Crafts, TVOptions>>
}

/**
 * Define a type-safe craft preset.
 *
 * This is an identity function that provides type checking and editor
 * auto-completion for preset definitions.
 *
 * @example
 * ```ts
 * const myPreset = definePreset({
 *   name: 'compact',
 *   crafts: {
 *     tvButton: {
 *       variants: {
 *         size: {
 *           base: { root: 'h-7 px-4 text-sm' },
 *         },
 *       },
 *     },
 *   },
 * })
 * ```
 */
export function definePreset(config: CraftPreset): CraftPreset {
  return config
}

/**
 * Resolve a preset chain into a flat set of craft overrides.
 *
 * Walks the `extend` chain from root to leaf, extending each craft
 * via `tv({ extend: base, ...overrides })`. The result can be spread
 * into `RUIConfigProvider`'s `theme.crafts` prop.
 *
 * @param preset - The preset to resolve
 * @param baseCrafts - The base craft definitions to extend from (typically `crafts` from `@raxium/themes/default`)
 * @returns A partial Crafts object with resolved overrides
 *
 * @example
 * ```ts
 * import { crafts } from '@raxium/themes/default'
 *
 * const resolved = resolvePreset(myPreset, crafts)
 * // Use in RUIConfigProvider:
 * // <RUIConfigProvider :config="{ theme: { crafts: resolved } }">
 * ```
 */
export function resolvePreset(preset: CraftPreset, baseCrafts: Crafts): Partial<Crafts> {
  // Recursively resolve the base preset first
  const base: Partial<Crafts> = preset.extend
    ? resolvePreset(preset.extend, baseCrafts)
    : {}

  const resolved: Partial<Crafts> = { ...base }

  for (const [key, overrides] of Object.entries(preset.crafts)) {
    const craftKey = key as keyof Crafts
    // Use the already-resolved craft from the chain, or fall back to default
    const baseCraft = resolved[craftKey] ?? baseCrafts[craftKey]

    if (!baseCraft || !overrides) continue

    resolved[craftKey] = tv({
      extend: baseCraft as any,
      ...overrides,
    }) as any
  }

  return resolved
}

/**
 * Merge multiple presets into one. Later presets take precedence.
 *
 * This is useful for composing independent presets that don't form
 * an extend chain (e.g., a "compact" preset + a "brand-colors" preset).
 *
 * @param presets - Presets to merge (later ones win on conflicts)
 * @param baseCrafts - The base craft definitions
 * @returns A partial Crafts object with all presets applied
 *
 * @example
 * ```ts
 * const resolved = mergePresets([compactPreset, brandPreset], crafts)
 * ```
 */
export function mergePresets(presets: CraftPreset[], baseCrafts: Crafts): Partial<Crafts> {
  const result: Partial<Crafts> = {}

  for (const preset of presets) {
    const resolved = resolvePreset(preset, baseCrafts)
    Object.assign(result, resolved)
  }

  return result
}
