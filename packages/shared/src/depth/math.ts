export const DEFAULT_DEPTH_BASE_VAR = 'var(--z-modal)'
export const DEFAULT_DEPTH_STEP = 10

/** CSS z-index expression for a root stack slot. */
export function zIndexAt(
  index: number,
  offset: number,
  baseVar: string,
  step: number,
): string {
  return `calc(${baseVar} + ${index * step + offset})`
}

/** Add a constant offset on top of an existing z-index expression. */
export function addZIndexOffset(zIndex: string, offset: number): string {
  return offset === 0 ? zIndex : `calc(${zIndex} + ${offset})`
}
