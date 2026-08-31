import type { crafts as defaultCrafts } from '../default'
import type { MotionMode } from '../default/crafts/motion'
import { crafts as libraryCrafts } from '../default'
import { tv } from './tv'

type Crafts = typeof defaultCrafts
type TVOptions = Parameters<typeof tv>[0]

/**
 * A composable theme preset that defines partial craft overrides.
 *
 * Unlisted `tv*` keys keep `@raxium/themes/default`. `extend` is a lineage chain;
 * independent packs should be passed as `preset={[a, b]}` on `RUIConfig`.
 */
export interface CraftPreset {
  name: string
  extend?: CraftPreset
  crafts: Partial<Record<keyof Crafts, TVOptions>>
}

/** One skin pack, or several (later entries win on the same `tv*` key). */
export type RuiPresetInput = CraftPreset | CraftPreset[]

/** Identity helper for typed preset objects. */
export function definePreset(config: CraftPreset): CraftPreset {
  return config
}

const MOTION_CRAFT_KEYS = [
  'tvPopover',
  'tvTooltip',
  'tvHoverCard',
  'tvMenu',
  'tvSelect',
  'tvDatePicker',
  'tvDialog',
  'tvAccordion',
  'tvCollapsible',
  'tvTreeBranch',
  'tvTabs',
  'tvRadioGroup',
] as const satisfies ReadonlyArray<keyof Crafts>

/**
 * App-wide overlay / dialog / collapse animation mode.
 * Compose with other packs: `preset={[defineMotionPreset('fade'), compactPreset]}`.
 */
export function defineMotionPreset(mode: MotionMode): CraftPreset {
  const crafts = Object.fromEntries(
    MOTION_CRAFT_KEYS.map(key => [key, { defaultVariants: { motion: mode } }]),
  ) as CraftPreset['crafts']

  return definePreset({
    name: `motion-${mode}`,
    crafts,
  })
}

/**
 * Resolve a preset chain into a partial crafts map (only keys the preset lists).
 * Prefer `RUIConfig preset` / `applyRuiCrafts` in apps.
 */
export function resolvePreset(preset: CraftPreset, baseCrafts: Crafts): Partial<Crafts> {
  const base: Partial<Crafts> = preset.extend
    ? resolvePreset(preset.extend, baseCrafts)
    : {}

  const resolved: Partial<Crafts> = { ...base }

  for (const [key, overrides] of Object.entries(preset.crafts)) {
    const craftKey = key as keyof Crafts
    const parentCraft = resolved[craftKey] ?? baseCrafts[craftKey]

    if (!parentCraft || !overrides)
      continue

    Object.assign(resolved, {
      [craftKey]: tv({
        extend: parentCraft as never,
        ...overrides,
      }),
    })
  }

  return resolved
}

/** Merge independent presets. Later presets win on the same craft key. */
export function mergePresets(presets: CraftPreset[], baseCrafts: Crafts): Partial<Crafts> {
  const result: Partial<Crafts> = {}

  for (const preset of presets) {
    Object.assign(result, resolvePreset(preset, baseCrafts))
  }

  return result
}

function pickDefinedCrafts(crafts?: Partial<Crafts>): Partial<Crafts> {
  if (!crafts)
    return {}
  return Object.fromEntries(
    Object.entries(crafts).filter(([, value]) => value != null),
  ) as Partial<Crafts>
}

/**
 * Crafts overlay for `RUIConfig`.
 *
 * `useTheme` still does `mergeCraftTables` (library default ← this overlay).
 * Order inside the overlay: `preset` ← `theme.crafts` escape hatch.
 */
export function applyRuiCrafts(
  preset?: RuiPresetInput,
  craftsEscape?: Partial<Crafts>,
  baseCrafts: Crafts = libraryCrafts as Crafts,
): Partial<Crafts> | undefined {
  let fromPreset: Partial<Crafts> | undefined
  if (preset) {
    fromPreset = Array.isArray(preset)
      ? mergePresets(preset, baseCrafts)
      : resolvePreset(preset, baseCrafts)
  }

  const fromEscape = pickDefinedCrafts(craftsEscape)
  if (!fromPreset && Object.keys(fromEscape).length === 0)
    return undefined

  return { ...fromPreset, ...fromEscape }
}
