import type { RefCallback } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'

type TeleportTarget = Element | string | null | undefined

export interface UseTeleportDetectionOptions {
  target?: TeleportTarget
}

function resolveTarget(target: TeleportTarget) {
  if (typeof document === 'undefined')
    return undefined
  if (target === undefined)
    return document.body
  if (typeof target === 'string')
    return document.querySelector(target)
  return target
}

export function useTeleportDetection(options: UseTeleportDetectionOptions = {}) {
  const [element, setElement] = useState<HTMLElement>()
  const [isTeleported, setIsTeleported] = useState(false)
  const sourceRef = useRef<HTMLElement | null>(null)
  const observerRef = useRef<MutationObserver>(undefined)

  const update = useCallback(() => {
    const node = sourceRef.current
    setElement(node ?? undefined)
    const target = resolveTarget(options.target)
    setIsTeleported(!!node && !!target && node.parentElement === target)
  }, [options.target])

  const setElementRef: RefCallback<HTMLElement | null> = useCallback((value) => {
    sourceRef.current = value
    update()
  }, [update])

  useEffect(() => {
    update()
    observerRef.current?.disconnect()
    if (typeof MutationObserver === 'undefined')
      return
    const target = resolveTarget(options.target)
    if (!target)
      return
    observerRef.current = new MutationObserver(update)
    observerRef.current.observe(target, { childList: true })
    return () => observerRef.current?.disconnect()
  }, [options.target, update])

  return {
    element,
    isTeleported,
    setElementRef,
    update,
  }
}
