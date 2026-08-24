import type { ReactNode } from 'react'
import { Children, Fragment, isValidElement } from 'react'

function typeName(type: unknown): string | undefined {
  if (typeof type === 'function' || (typeof type === 'object' && type != null))
    return (type as { displayName?: string }).displayName
  return undefined
}

function isPopoverArrow(type: unknown) {
  return typeName(type) === 'Popover.Arrow'
}

export function splitPopoverArrow(children: ReactNode) {
  const arrows: ReactNode[] = []
  const rest: ReactNode[] = []

  function walk(node: ReactNode) {
    Children.forEach(node, (child) => {
      if (!isValidElement(child)) {
        rest.push(child)
        return
      }
      if (child.type === Fragment) {
        walk((child.props as { children?: ReactNode }).children)
        return
      }
      if (isPopoverArrow(child.type))
        arrows.push(child)
      else
        rest.push(child)
    })
  }

  walk(children)
  return { arrows, rest }
}
