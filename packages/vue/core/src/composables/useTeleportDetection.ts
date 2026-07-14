import type { ComponentPublicInstance, MaybeRefOrGetter } from 'vue'
import { nextTick, onBeforeUnmount, onMounted, onUpdated, shallowRef, toValue, watch } from 'vue'

type TeleportTarget = Element | string | null | undefined
type RefValue = Element | ComponentPublicInstance | null

export interface UseTeleportDetectionOptions {
  target?: MaybeRefOrGetter<TeleportTarget>
}

function resolveElement(value: RefValue) {
  if (typeof HTMLElement !== 'undefined' && value instanceof HTMLElement)
    return value
  const el = value && '$el' in value ? value.$el : undefined
  return typeof HTMLElement !== 'undefined' && el instanceof HTMLElement ? el : undefined
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
  const element = shallowRef<HTMLElement>()
  const source = shallowRef<RefValue>(null)
  const isTeleported = shallowRef(false)
  let observer: MutationObserver | undefined
  let isMounted = false

  function disconnect() {
    observer?.disconnect()
    observer = undefined
  }

  function update() {
    // Always re-resolve from the source ref: for components with Presence /
    // conditional roots (e.g. Popover.Positioner), `$el` swaps between a
    // Comment node and the real element over the component's lifetime. Caching
    // the resolved element at ref-fire time would freeze us to the stale root.
    element.value = resolveElement(source.value)
    const target = resolveTarget(toValue(options.target))
    isTeleported.value = !!element.value && !!target && element.value.parentElement === target
  }

  function observeTarget() {
    disconnect()
    if (!isMounted)
      return
    if (typeof MutationObserver === 'undefined')
      return
    const target = resolveTarget(toValue(options.target))
    if (!target)
      return
    observer = new MutationObserver(update)
    observer.observe(target, { childList: true })
  }

  function setElementRef(value: RefValue) {
    source.value = value
    update()
  }

  onMounted(() => {
    isMounted = true

    nextTick(() => {
      update()
      observeTarget()
    })
  })

  onUpdated(update)

  onBeforeUnmount(() => {
    isMounted = false
    disconnect()
  })

  watch(
    () => toValue(options.target),
    () => {
      update()
      observeTarget()
    },
  )

  return {
    element,
    isTeleported,
    setElementRef,
    update,
  }
}
