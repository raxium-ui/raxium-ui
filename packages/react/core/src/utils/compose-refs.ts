import type { Ref } from 'react'
import { useCallback } from 'react'

type PossibleRef<T> = Ref<T> | undefined

function assignRef<T>(ref: PossibleRef<T>, value: T | null) {
  if (!ref)
    return
  if (typeof ref === 'function') {
    ref(value)
    return
  }
  try {
    ref.current = value
  }
  catch {
    // ignore frozen refs
  }
}

/** Merge multiple React refs into a single callback ref. */
export function composeRefs<T>(...refs: PossibleRef<T>[]) {
  return (node: T | null) => {
    for (const ref of refs)
      assignRef(ref, node)
  }
}

export function useComposedRefs<T>(...refs: PossibleRef<T>[]) {
  return useCallback(composeRefs(...refs), refs)
}
