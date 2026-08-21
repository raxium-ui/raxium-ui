import type { CSSProperties, RefObject } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'

interface RippleItem {
  x: number
  y: number
  size: number
  key: number
}

export interface UseRippleOptions {
  enabled?: boolean
  duration?: number
  color?: string | (() => string | undefined)
}

function resolveColor(color: UseRippleOptions['color'], fallback: string) {
  if (typeof color === 'function')
    return color() ?? fallback
  return color ?? fallback
}

export function useRipple(
  referenceRef: RefObject<Element | null>,
  {
    duration = 600,
    color = '#44D62C',
    enabled = true,
  }: UseRippleOptions = {},
) {
  const [ripples, setRipples] = useState<RippleItem[]>([])
  const addedRelativeRef = useRef(false)

  const onRipple = useCallback((event: Pick<MouseEvent, 'clientX' | 'clientY'>) => {
    const reference = referenceRef.current
    if (!reference || !enabled)
      return

    const position = getComputedStyle(reference).position
    if (position === 'static') {
      reference.classList.add('relative')
      addedRelativeRef.current = true
    }

    const rect = reference.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const item: RippleItem = {
      x: event.clientX - rect.left - size / 2,
      y: event.clientY - rect.top - size / 2,
      size,
      key: Date.now(),
    }
    setRipples(prev => [...prev, item])
  }, [enabled, referenceRef])

  useEffect(() => {
    if (ripples.length === 0) {
      const reference = referenceRef.current
      if (reference && addedRelativeRef.current) {
        reference.classList.remove('relative')
        addedRelativeRef.current = false
      }
      return
    }

    const lastRipple = ripples[ripples.length - 1]
    const timer = window.setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.key !== lastRipple.key))
    }, duration)

    return () => window.clearTimeout(timer)
  }, [duration, referenceRef, ripples])

  const Ripple = useCallback(() => {
    const backgroundColor = resolveColor(color, '#44D62C')
    return (
      <span className="pointer-events-none absolute inset-0 overflow-hidden">
        {ripples.map(ripple => (
          <span
            key={ripple.key}
            className="absolute rounded-full bg-transparent opacity-30 animate-rippling"
            style={{
              width: `${ripple.size}px`,
              height: `${ripple.size}px`,
              top: `${ripple.y}px`,
              left: `${ripple.x}px`,
              backgroundColor,
              transform: 'scale(0)',
              animationDuration: `${duration}ms`,
            } as CSSProperties}
          />
        ))}
      </span>
    )
  }, [color, duration, ripples])

  return { Ripple, onRipple }
}
