import type { ReactNode } from 'react'
import { Children, Fragment, isValidElement } from 'react'

function typeName(type: unknown): string | undefined {
  if (typeof type === 'function' || (typeof type === 'object' && type != null))
    return (type as { displayName?: string }).displayName
  return undefined
}

export function hasDialogHeader(children: ReactNode): boolean {
  let found = false
  function walk(node: ReactNode) {
    Children.forEach(node, (child) => {
      if (found || !isValidElement(child))
        return
      if (child.type === Fragment) {
        walk((child.props as { children?: ReactNode }).children)
        return
      }
      if (typeName(child.type) === 'Dialog.Header')
        found = true
    })
  }
  walk(children)
  return found
}
