import type { ReactNode } from 'react'
import { Children, Fragment, isValidElement } from 'react'

function typeName(type: unknown): string | undefined {
  if (typeof type === 'function' || (typeof type === 'object' && type != null))
    return (type as { displayName?: string }).displayName
  return undefined
}

function isHoverCardArrow(type: unknown) {
  return typeName(type) === 'HoverCard.Arrow'
}

/** Pull `HoverCard.Arrow` out of children so it stays a sibling of the inner wrapper. */
export function splitHoverCardArrow(children: ReactNode) {
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
      if (isHoverCardArrow(child.type))
        arrows.push(child)
      else
        rest.push(child)
    })
  }

  walk(children)
  return { arrows, rest }
}
