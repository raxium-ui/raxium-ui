/**
 * Attach subcomponents onto a root for `Root.Item` usage.
 * Keep `Root` as the return call signature so Vue SFC generics are not widened.
 */
export function withCompoundParts<Root extends object, Parts extends Record<string, unknown>>(
  root: Root,
  parts: Parts,
): Root & Parts {
  return Object.assign(root, parts)
}
