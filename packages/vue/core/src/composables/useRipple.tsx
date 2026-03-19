import type { ComputedRef, MaybeRef, Ref } from 'vue'
import { computed, ref, unref, watchEffect } from 'vue'

type MaybeRefOrComputedRef<T> = MaybeRef<T> | ComputedRef<T>
interface Options {
  enabled?: MaybeRefOrComputedRef<boolean | undefined>
  duration?: MaybeRefOrComputedRef<number | undefined>
  color?: MaybeRefOrComputedRef<string | undefined>
}

export function useRipple(
  referenceRef: Ref<Element | null> | ComputedRef<Element | null>,
  {
    duration = 600,
    color = '#44D62C',
    enabled = true,
  }: Options = {},
) {
  const ripples = ref<Array<{ x: number, y: number, size: number, key: number }>>([])
  const isRelativedReference = computed(() => {
    if (!referenceRef.value)
      return false
    return getComputedStyle(referenceRef.value).position !== 'static'
  })
  const onRipple = (event: MouseEvent) => {
    if (!referenceRef.value || !unref(enabled))
      return
    const reference = referenceRef.value!
    if (!isRelativedReference.value)
      reference.classList.add('relative')
    const rect = reference.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = event.clientX - rect.left - size / 2
    const y = event.clientY - rect.top - size / 2

    const newRipple = { x, y, size, key: Date.now() }
    ripples.value.push(newRipple)
  }

  watchEffect((onCleanup) => {
    if (ripples.value.length > 0) {
      const lastRipple = ripples.value[ripples.value.length - 1]
      const timer = setTimeout(() => {
        ripples.value = ripples.value.filter(
          ripple => ripple.key !== lastRipple.key,
        )
      }, unref(duration))
      onCleanup(() => clearTimeout(timer))
    }
    else {
      if (!referenceRef.value)
        return
      const reference = referenceRef.value!
      if (!isRelativedReference.value)
        reference.classList.remove('relative')
    }
  })

  const Ripple = computed(() => {
    return (
      <span
        class="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {ripples.value.map(ripple => (
          <span
            key={ripple.key}
            class="absolute rounded-full bg-transparent opacity-30 animate-rippling"
            style={{
              width: `${ripple.size}px`,
              height: `${ripple.size}px`,
              top: `${ripple.y}px`,
              left: `${ripple.x}px`,
              backgroundColor: unref(color),
              transform: 'scale(0)',
              animationDuration: `${unref(duration)}ms`,
            }}
          />
        ))}
      </span>
    )
  })

  return { Ripple, onRipple }
}
