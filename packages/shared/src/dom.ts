export function findUp(
  el: HTMLElement | null | undefined,
  predicate: (node: HTMLElement) => boolean,
): boolean {
  let cur: HTMLElement | null | undefined = el
  if (!cur)
    return false
  while (cur) {
    if (predicate(cur))
      return true
    cur = cur.parentElement
  }
  return false
}

export function findParentElementByScope(
  el: HTMLElement | null | undefined,
  scope: string,
  part?: string,
): HTMLElement | null | undefined {
  let cur: HTMLElement | null | undefined = el
  if (!cur)
    return null
  while (cur) {
    if (cur.dataset.scope === scope) {
      if (part && cur.dataset.part === part)
        return cur
      else return cur
    }
    cur = cur.parentElement
  }
  return null
}
