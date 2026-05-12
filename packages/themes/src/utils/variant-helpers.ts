import type { ClassValue } from 'clsx'

/**
 * Generate compoundVariants by mapping each variant value to a slot class.
 *
 * Reduces boilerplate for common "size → slot class" patterns.
 *
 * @example
 * ```ts
 * // Before (4 entries):
 * compoundVariants: [
 *   { size: 'xs', class: { indicator: 'size-2' } },
 *   { size: 'sm', class: { indicator: 'size-2.5' } },
 *   { size: 'base', class: { indicator: 'size-3' } },
 *   { size: 'lg', class: { indicator: 'size-3.5' } },
 * ]
 *
 * // After (1 call):
 * compoundVariants: [
 *   ...mapVariant('size', {
 *     xs: { indicator: 'size-2' },
 *     sm: { indicator: 'size-2.5' },
 *     base: { indicator: 'size-3' },
 *     lg: { indicator: 'size-3.5' },
 *   }),
 * ]
 * ```
 */
export function mapVariant<V extends string>(
  variant: string,
  mapping: Record<V, Record<string, ClassValue>>,
): Array<Record<string, any>> {
  return Object.entries<Record<string, ClassValue>>(mapping).map(([value, classMap]) => ({
    [variant]: value,
    class: classMap,
  }))
}

/**
 * Generate compoundVariants from two variant dimensions (e.g., orientation × size).
 *
 * @example
 * ```ts
 * compoundVariants: [
 *   ...mapVariant2d('orientation', 'size', {
 *     horizontal: {
 *       xs: { track: 'w-full h-1', range: 'h-full' },
 *       sm: { track: 'w-full h-1.5', range: 'h-full' },
 *     },
 *     vertical: {
 *       xs: { track: 'h-full w-1', range: 'w-full' },
 *       sm: { track: 'h-full w-1.5', range: 'w-full' },
 *     },
 *   }),
 * ]
 * ```
 */
export function mapVariant2d<V1 extends string, V2 extends string>(
  variant1: string,
  variant2: string,
  mapping: Record<V1, Record<V2, Record<string, ClassValue>>>,
): Array<Record<string, any>> {
  const result: Array<Record<string, any>> = []
  for (const [v1, inner] of Object.entries<Record<V2, Record<string, ClassValue>>>(mapping)) {
    for (const [v2, classMap] of Object.entries<Record<string, ClassValue>>(inner as any)) {
      result.push({
        [variant1]: v1,
        [variant2]: v2,
        class: classMap,
      })
    }
  }
  return result
}
