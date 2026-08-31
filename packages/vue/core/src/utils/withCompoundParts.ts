/**
 * Attach subcomponents onto a root for `Root.Item` usage without dropping named exports.
 */
export function withCompoundParts<Root extends object, Parts extends Record<string, unknown>>(
  root: Root,
  parts: Parts,
): Root & Parts {
  return Object.assign(root, parts)
}
